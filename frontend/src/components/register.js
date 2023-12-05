  import { useState } from "react"
  import { Link } from "react-router-dom";

export const Register = () => {
  const [formDataMissing, setFormDataMissing] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: ''
  });
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const {first_name, last_name, username, password} = formData
    // eslint-disable-next-line
    if (first_name, last_name, username, password) {
      registerAccount();
    } else {
      setFormDataMissing(true)
    }
  }

  const registerAccount = () => {
    fetch('http://localhost:8080/users/register', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(formData)
    }).then(res => {
      if (res.status === 201) {
        setAccountCreated(true);
      } else if (res.status === 400) {
        duplicateUsername();
      }
    })
  }

  const duplicateUsername = () => {
    
  }

  return (
    <>
    {!accountCreated ?
      <div>
        <h2>Create An Account</h2>
        <form onSubmit={handleSubmit}>
          <p>First Name</p>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} placeholder={formDataMissing ? '**Required' : ''} />
          <p>Last Name</p>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} placeholder={formDataMissing ? '**Required' : ''} />
          <p>Username</p>
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder={formDataMissing ? '**Required' : ''} />
          <p>Password</p>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder={formDataMissing ? '**Required' : ''} />
          <br/>
          <button type="submit">Create Account</button>
        </form>
        <p>Already have an account?</p>
        <Link to="/login">Sign In</Link>
      </div>
    : 
      <div>
        <p>Account Created!</p>
        <Link to="/login">Go To Sign In</Link>
      </div>}
    </>
  )
}
