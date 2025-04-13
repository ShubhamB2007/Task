import React, { useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google'
import axios from 'axios';
import GoogleLogin from './GoogleLogin';
import { toast } from 'react-toastify'; 
import {motion} from 'framer-motion'

const SignUp = () => {
  const [data, setData] = useState({ 
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const url = "http://localhost:3000//api/signup";
      const response = await axios.post(url, data);
      console.log(response.data);
      const {name,id} = response.data.user;
      localStorage.setItem('userName', name)
      localStorage.setItem('id', id.toString())
      toast.success(`Welcome ${name}`, { position: "top-right" })
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.log("Validation Error:", error.response.data.details);
      } else {
        console.log("Signup failed:", error);
      }
    }
  };

  const GoogleAuthWrapper = ()=>(
    <GoogleOAuthProvider clientId="458309077734-e56o8d3uvn7fsaja1km41de6kqbgd27g.apps.googleusercontent.com">
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
    <div className='w-full h-full flex justify-center'>
      <motion.form 
      variants={FormVariants} initial='hidden' animate='visible'
      className="form absolute top-20 light-mode-bg-secondary max-sm:top-8 max-sm:rounded-2xl" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label  className='light-mode:text-black'>Full Name</label>
        </div>
        <div className="inputForm">
          <AiOutlineUser size={20} />
          <input 
            type="text" 
            placeholder="Enter your Full Name" 
            className="input" 
            name="name" 
            value={data.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="flex-column">
          <label className='light-mode:text-black'>Email</label>
        </div>
        <div className="inputForm">
          <MdOutlineEmail size={20} />
          <input 
            type="email" 
            placeholder="Enter your Email" 
            className="input" 
            name="email" 
            value={data.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="flex-column">
          <label className='light-mode:text-black'>Password</label>
        </div>
        <div className="inputForm">
          <RiLockPasswordLine size={20} />
          <input 
            type="password" 
            placeholder="Enter your Password" 
            className="input" 
            name="password" 
            value={data.password} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className="button-submit">Sign Up</button>

        <p className="p light-mode:text-black">
          Already have an account? 
          <Link to='/login'><span className="span">Login</span></Link>
        </p>

        <p className="p line light-mode:text-black">Or Login With</p>
         
        <GoogleAuthWrapper/>
      </motion.form>
    </div>
    </div>
  );
};

export default SignUp;
