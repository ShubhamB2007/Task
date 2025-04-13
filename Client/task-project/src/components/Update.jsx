import React from 'react'
import { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import {toast} from 'react-toastify'
import { motion } from 'framer-motion';

const UpdateVariants = {
   hidden:{ opacity:0, y:50 },
   visible:{ opacity:1, y:0,
    transition:{ delay: 0.5, duration:0.4}
   }
}

const Update = ({task, getData}) => {

    const navigate = useNavigate();

   const [date, setDate] = useState(task ? new Date(task.dueDate) : new Date());
   const [title, setTitle] = useState(task ? task.title : '');
   const [status, setStatus] = useState(task ? task.status : 'Pending');
   const [category, setCategory] = useState(task ? task.category : 'Work');
   const [priority, setPriority] = useState(task ? task.priority : 'Low');

   useEffect(() => {
      if (task) {
         setTitle(task.title);
         setStatus(task.status);
         setCategory(task.category);
         setPriority(task.priority);
         setDate(new Date(task.dueDate));
      }
   }, [task]);  

   function formatDate(date) {
      const months = [
          "January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"
      ];
      
      const dateObj = new Date(date);
      const day = dateObj.getDate();
      const month = months[dateObj.getMonth()];
      const year = dateObj.getFullYear();
      
      setDate(`${day} ${month} ${year}`);
  }

   const taskData = { title, status, category, priority, dueDate: date };

   const handleUpdate = async () => {
      if (!task || !task._id) return;
      console.log(taskData)

      try {
         const res = await axios.put(`http://localhost:3000/tasks/${task._id}`, taskData);   
         await getData()
         toast.success('Task Updated Successfully!', {
                position: "top-right",
         });
         console.log(res.data);
         navigate('/');     
      } catch (error) { 
         console.log(error);
      }
   };

  return (
    <div className='absolute w-[80%] max-sm:w-full h-full left-[20%] max-sm:left-0 max-sm:top-0 bg-[#0a061d] light-mode-bg-main'>
           <div className='absolute w-full h-full bg-[#1a1631] rounded-l-[50px] max-sm:rounded-l-xl max-sm:rounded-r-xl flex justify-center light-mode-bg-secondary'>
               <p className='text-2xl font-bold text-white absolute top-5 mr-12 max-sm:mr-0 light-mode:text-black'>Update Task</p>
               
               <motion.div 
               variants={UpdateVariants} initial='hidden' animate='visible'
               className='w-[80%] h-[550px] top-24 max-sm:top-16 max-sm:left-0 absolute'>
                  <div className='flex flex-col gap-2 items-center absolute top-0 left-40 max-sm:left-6'>
                  <label className='text-white text-lg mr-10 max-sm:mr-0 light-mode:text-black'>Title</label>
                  <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className='w-[650px] light-mode-bg-third max-sm:w-[345px] h-10 rounded-lg bg-[#27233e] text-white font-semibold pl-5 outline-none' placeholder={title} />
                  </div>
                  <div className='flex gap-8.5 items-center absolute top-28 left-[163px] max-sm:left-6'>
                    <label className='text-white text-lg light-mode:text-black'>Priority</label>
                    <select value={priority} onChange={(e)=>setPriority(e.target.value)} className='w-40 light-mode-bg-third h-10 rounded-lg bg-[#27233e] text-white cursor-pointer pr-2 font-semibold outline-none pl-2'>    
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                  </div>
                  <div className='flex gap-4 items-center absolute top-48 max-sm:top-44 left-[163px]  max-sm:left-6  '>
                  <label className='text-white text-lg light-mode:text-black'>Due Date</label>
                  <DatePicker selected={date} onChange={(date) => formatDate(date)} className='text-white bg-[#27233e] w-40 light-mode-bg-third h-10 rounded-lg pl-10 ml-0.5'></DatePicker>
                  </div>
                  <div className='flex gap-4 items-center absolute top-28 max-sm:top-60 left-[537px] max-sm:left-6'>
                    <label className='text-white text-lg light-mode:text-black'>Status</label>
                    <select value={status} onChange={(e)=>setStatus(e.target.value)} className='w-52 light-mode-bg-third max-sm:w-40 max-sm:ml-5.5 h-10 rounded-lg bg-[#27233e] text-white cursor-pointer pr-2 font-semibold outline-none pl-2'>    
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className='flex gap-4 items-center absolute top-48 left-[512px] max-sm:left-6 max-sm:top-[300px]'>
                    <label className='text-white text-lg light-mode:text-black'>Category</label>
                    <select value={category} onChange={(e)=>setCategory(e.target.value)} className='w-52 light-mode-bg-third max-sm:w-40 max-sm:ml-0.5 h-10 rounded-lg bg-[#27233e] text-white cursor-pointer pr-2 font-semibold outline-none pl-2'>    
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Travel">Travel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Household">Household</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    </select>
                  </div>

                  <button onClick={handleUpdate} className='w-48 left-96 light-mode-black-button max-sm:w-56 h-10 max-sm:top-[440px] max-sm:left-22 rounded-xl bg-[#ffd88d] font-semibold cursor-pointer hover:bg-[#e5bf7a] hover:duration-200 mr-10 top-72 absolute'>Save</button>

               </motion.div>
           </div>
        </div> 
      )
    }

export default Update