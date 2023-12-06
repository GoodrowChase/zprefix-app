const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const bcrypt = require('bcrypt');

const app = express();
const port = 8080; 

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`server listening on port ${port}`));

// User Registration
app.post('/users/register', async (req, res) => {
  const {first_name, last_name, username, password} = req.body;
  try {
    let usernameIsDuplicate = false;
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = { first_name: first_name, last_name: last_name, username: username, password: hashedPassword }

    knex('user_data')
      .then(userData => {
        userData.forEach(user => {
          if (user.username === username) 
            usernameIsDuplicate = true
        })
        if (!usernameIsDuplicate) {
          knex('user_data').insert(user)
            .then(res.status(201).send())
        } else {
          res.status(400).send('Username already exists')
        }
      })
  } catch {
    res.status(500).send()
  }
})

// User login
app.post('/users/login', async (req, res) => {
  const {username, password} = req.body
  try {
    const user = await knex('user_data').select('*').where('username', username)
    if (!user[0]) {
      return res.status(400).send('no user found')
    }
    if(await bcrypt.compare(password, user[0].password)) {
      res.status(200).send({id: user[0].id, first_name: user[0].first_name, last_name: user[0].last_name, username: user[0].username})
    } else {
      res.status(400).send('wrong password')
    }
  } catch {
    res.status(500).send()
  }
})

// get all item data
app.get('/items', async (req, res) => {
  knex('item').select('*')
    .then(all_items => res.status(200).send(all_items))
    .catch(e => res.status(500).send())
})

// get user item data
app.get('/user/items', async (req, res) => {
  const {id} = req.query
  knex('item').select('*')
    .where('user_id', id)
    .then(user_items => res.status(200).send(user_items))
    .catch(e => res.status(500).send())
})

// add a new item
app.post('/create', async (req, res) => {
  const {user_id, item_name, description, quantity} = req.body
  knex('item').insert({
    user_id: user_id,
    item_name: item_name,
    description: description,
    quantity: quantity
  }).then(data => res.status(201).send(data))
    .catch(e => res.status(500).send(e))
})

app.patch('/item', async (req, res) => {
  const {id, item_name, description, quantity} = req.body
  knex('item').where('id', id)
    .update({
      item_name:item_name,
      description:description,
      quantity:quantity
    })
    .then(x => res.status(200).send())
    .catch(e => res.status(500).send())
})

app.delete('/item', async (req, res) => {
  const {id} = req.body
  knex('item').where('id', id).del()
    .then(x => res.status(200).send())
    .catch(e => res.status(500).send())
})

