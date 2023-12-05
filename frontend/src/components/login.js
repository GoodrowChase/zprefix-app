import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import { appContext } from "./App";



export const Login = () => {
  const navigate = useNavigate();
  const {setUserData, setLoggedIn} = useContext(appContext);
  const [formDataMissing, setFormDataMissing] = useState(false);
  const [formDataWrong, setFormDataWrong] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {username, password} = formData
    // eslint-disable-next-line
    if (username, password) {
      signIn();
    } else {
      setFormDataMissing(true)
    }
  }

  const signIn = () => {
    fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(formData)
    }).then(res => {
      if (res.status === 200) {
        res.json().then(user_data => {
            setLoggedIn(true);
            setUserData(user_data);
            navigate('/')
          })
      } else if (res.status === 400) {
        setFormDataWrong(true);
      }
    })
  }
  

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <p>Username</p>
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder={formDataMissing ? '**Required' : ''}/>
        <p>Password</p>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder={formDataMissing ? '**Required' : ''}/>
        <button type="submit">Sign In</button>
      </form>
      <p>New here?</p>
      <Link to="/register">Create account</Link>
    </div>
  )
}