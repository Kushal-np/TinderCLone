import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailId , setEmailId] = useState("");
  const [password , setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() =>{
    try{
    const res = await axios.post("http://localhost:7000/auth/login" , {
      emailId , password
    },{
      withCredentials:true
    })
    console.log(res.data);
    dispatch(addUser(res.data))
    console.log(emailId , password)
    navigate("/");
  }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>

    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" value={emailId} onChange={(e)=>setEmailId(e.target.value)} className='input'  placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
        </fieldset>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login