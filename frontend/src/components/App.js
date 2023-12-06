import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, createContext } from 'react';
import { Login } from './login';
import { Register } from './register';
import { Home } from './home';
import { Logout } from './logout';
import { Profile } from './profile';
import { CreateItem } from './create-item';

export const appContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate(); 

  return (
    <appContext.Provider value={{userData, setUserData, setLoggedIn, navigate}}>
      <nav className='nav-bar'>
        <Link to='/'>Home</Link>
        {!loggedIn ? <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link></>
          : <>
            <Link to='/create'>Create Item</Link>
            <Link to='/profile'>My Inventory</Link>
            <Link to='/logout'>Sign Out</Link></>}

      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateItem />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </appContext.Provider>
  );
}

export default App;
