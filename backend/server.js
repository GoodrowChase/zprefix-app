const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const bcrypt = require('bcrypt');

const app = express();
const port = 8080; 

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`server listening on port ${port}`));



app.get('/users', async (req, res) => {
  res.send('hello')
})

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