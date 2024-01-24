import { useState } from 'react';
import './LogIn.css' ;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const LogIn = ({setLoginUser}) => { 
     
       const navigate =   useNavigate();

    const [ user ,setUser] = useState({
        email:"",
        password:"",
    })

    const handleChange =(e)=>{
        const {name , value} = e.target
        setUser({
            ...user,
            [name] : value
        })
    }

    const login =()=>{
      const {email, password} = user 
      if( email && password )
      {
    
        axios.post("http://localhost:9002/login", user)
        .then(response => {
          alert(response.data.message);
          setLoginUser(response.data.user)
          navigate("/")
      })
      }else {
        alert("invalid input")
      }
    
    }

 

  return (
    <div className='login'>
     {console.log("User",user)}
        <h1>LogIn</h1>

        <input type='text' name='email' value={user.email} placeholder='Enter Your Email' onChange={handleChange} />
        <input type='password' name='password' value={user.password} placeholder='Enter Your Password' onChange={handleChange} />
        <div className='button' onClick={login}>LogIn</div>
        <div>or</div>
        <div className='button'  onClick={()=> navigate("/register")} >Register</div>
    </div>
  )

}

export default LogIn