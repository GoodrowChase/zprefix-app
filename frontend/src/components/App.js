import { Routes, Route, Link } from 'react-router-dom';
import { Login } from './login';
import { Register } from './register';
import { Home } from './home';
import { Logout } from './logout';
import { useState, createContext } from 'react';

export const appContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  return (
    <appContext.Provider value={{userData, setUserData, setLoggedIn}}>
      <nav className='nav-bar'>
        <Link to='/'>Home</Link>
        {!loggedIn ? <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link></>
          : <Link to='/logout'>Log Out</Link>}

      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </appContext.Provider>
  );
}

export default App;
