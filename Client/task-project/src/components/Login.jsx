import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import {GoogleOAuthProvider} from '@react-oauth/google'
import GoogleLogin from "./GoogleLogin";
import { toast } from 'react-toastify'; 
import {delay, motion} from 'framer-motion'

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });


  const navigate = useNavigate();

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data)
    try {
      const url = "http://localhost:3000//api/login";
      const res = await axios.post(url, data);
      console.log(res.data.message); 
    
      const { token, user } = res.data

      if (res.data.token) {
        localStorage.setItem('token', token)
        localStorage.setItem('userName', user.name)
        localStorage.setItem('Email', user.email)
        console.log(user.name)
        toast.success(`Welcome ${user.name}`, { position: "top-right" })
        navigate('/'); 
      } else {
        console.log("Token not found");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const GoogleAuthWrapper = ()=>(
    <GoogleOAuthProvider clientId="458309077734-99vk7c5aso54uf5c3db5dnt84rkrci16.apps.googleusercontent.com">
      <GoogleLogin></GoogleLogin>
    </GoogleOAuthProvider>
  );

  const FormVariants = {
    hidden:{
       opacity:0,y:50
    },
    visible:{
      opacity:1,y:0,
      transition:{delay:0.3, duration:0.5}
    }
  }

  return (
    <div className='absolute w-[80%] max-sm:w-full h-full left-[20%] max-sm:left-0 max-sm:top-20 bg-[#0a061d] light-mode-bg-main'>
    <div className="w-full h-full absolute flex justify-center">
      <motion.form 
      variants={FormVariants} initial='hidden' animate='visible'
      className="form absolute top-16 light-mode-bg-secondary max-sm:top-8 max-sm:rounded-2xl" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label className="light-mode:text-black">Email</label>
        </div>
        <div className="inputForm">
          <input
            placeholder="Enter your Email"
            className="input"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex-column">
          <label className="light-mode:text-black">Password</label>
        </div>
        <div className="inputForm">
          <input
            placeholder="Enter your Password"
            className="input"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" className="absolute mt-2 cursor-pointer" />
            <label className="ml-5 light-mode:text-black">Remember me</label>
          </div>
        </div>

        <button onClick={handleSubmit} type="submit" className="button-submit">
          Login
        </button>

        <p className="p light-mode:text-black">
          Don't have an account?
          <Link to='/signup'>
            <span className="span">Sign Up</span>
          </Link>
        </p>

        <p className="p line light-mode:text-black">Or With</p>
        <GoogleAuthWrapper/>
        <p className="text-sm text-red-600">*Note: If you want organize event, you have to <b>manually</b> register your account by <b>signing up</b></p>
      </motion.form>
     </div>
     </div>  
  );
};

export default Login;
