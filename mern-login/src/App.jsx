import HomePage from "./components/homepage/HomePage"
import LogIn from "./components/login/LogIn"
import Register from "./components/register/Register"
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import './App.css'
import { useState } from "react";
const App = () => {
 
  const [user , setLoginUser] =useState({});

  return (
    <div className="App">
  <Router>
    <Routes>
   
    <Route exact path="/" element=  {
      user && user._id ? <HomePage setLoginUser={setLoginUser}/> : <LogIn setLoginUser={setLoginUser}/>
    }/>
    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<LogIn setLoginUser={setLoginUser}/>} />
    </Routes>
  </Router>
     
    </div>
  )
}

export default App