import { appContext } from "./App"
import { useContext } from "react"

export const Logout = () => {
  const {setUserData, setLoggedIn, navigate} = useContext(appContext);

  const resetData = () => {
    setUserData({})
    setLoggedIn(false)
    navigate('/login')
  }
  
  return (
    <div className="login-form">
      <h2>Are you sure you want to log out?</h2>
      <button onClick={resetData}>Log Out</button>
    </div>
  )
}