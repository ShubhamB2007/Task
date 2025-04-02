import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { BsDatabase } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";
import { RiFlag2Line } from "react-icons/ri";
import { RiEditLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useState,useEffect } from 'react';
import {motion} from 'framer-motion'
import axios from 'axios'
import { FaBriefcase, FaShoppingCart, FaHeartbeat, FaGraduationCap, FaPlaneDeparture , FaClipboardList, FaMusic, FaDumbbell, FaUtensils, FaUsers } from "react-icons/fa";

const taskVariants = {
  hidden:{ opacity:0, x:-100 },
  visible: (index)=>({
     opacity:1, x:0,
     transition:{delay:0.4 + index*0.3, duration:0.5} 
  })
}

const  Home = ({tasks,onUpdateClick, setTasks, handleSearch, getData}) => {

  const handleDelete = async (id)=>{
    try {
      await axios.delete(`http://localhost:3000/tasks/`+ id)
      setTasks(tasks.filter(task => task.id !== id))
      await getData()
      toast.success('Task Deleted Successfully!', {
              position: "top-right",
      });
    } catch (error) {
      console.log(error)
    }
  }

  const taskCategories = {
    "Work": { icon: <FaBriefcase />, color: "#ff9800" },
    "Personal": { icon: <FaUsers />, color: "#4caf50" }, 
    "Health": { icon: <FaHeartbeat />, color: "#e91e63" }, 
    "Education": { icon: <FaGraduationCap />, color: "#2196f3" }, 
    "Travel": { icon: <FaPlaneDeparture  />, color: "#9c27b0" }, 
    "Shopping": { icon: <FaShoppingCart />, color: "#ff5722" }, 
    "Household": { icon: <FaClipboardList />, color: "#795548" }, 
    "Fitness": { icon: <FaDumbbell />, color: "#009688" }, 
    "Food": { icon: <FaUtensils />, color: "#cddc39" }, 
    "Entertainment": { icon: <FaMusic />, color: "#673ab7" } 
  };

  return (  
    <div className='absolute w-[80%] h-full left-[20%] max-sm:left-0 max-sm:w-full max-sm:top-20 bg-[#0a061d] light-mode-bg-main'>
       <div className='absolute w-full h-full bg-[#1a1631] rounded-l-[50px] max-sm:rounded-l-xl max-sm:rounded-r-xl flex justify-center light-mode-bg-secondary'>
        <div className='w-[80%] h-20 max-sm:top-5 max-sm:w-[355px] max-sm:h-12 rounded-xl bg-[#27233e] absolute top-10 flex items-center light-mode-bg-third'>
           <div className='w-96 h-12 rounded-full light-mode-border border border-[#6b6683] text-white ml-10 max-sm:ml-[-10px] max-sm:border-none absolute'>
              <input onChange={handleSearch} type="text" className='absolute w-[70%] h-full ml-7 outline-none' placeholder='Search by report name...' />
              <IoMdSearch className='text-2xl light-mode:text-white text-[#6b6683] absolute top-3 left-[85%]' />
           </div>
        </div>
        <p className='text-3xl text-white absolute top-40 left-32 font-bold max-sm:left-6.5 max-sm:text-xl max-sm:top-24 light-mode:text-black'>Manage Task</p>
        <Link to='/voice'>
        <button className='absolute max-sm:left-[170px] max-sm:ml-1 max-sm:w-28 max-sm:top-20 max-sm:mt-3 max-sm:text-[10px] max-sm:h-8 w-52 font-semibold cursor-pointer h-10 rounded-full text-white bg-linear-to-b from-[#967eff] to-[#684ae8] top-40 left-[58%]'>Use Voice Command</button>
        </Link>
        <Link to='/create'>
          <button className='absolute max-sm:left-72 max-sm:ml-1 max-sm:w-20 max-sm:top-20 max-sm:mt-3 max-sm:text-[10px] max-sm:h-8 w-40 font-semibold cursor-pointer h-10 rounded-full text-white bg-linear-to-b from-[#967eff] to-[#684ae8] top-40 left-[76.8%]'>Add New Task</button>
          </Link> 
         
        <div className='absolute w-[80%] pr-3 max-sm:w-[88.5%] h-[490px] top-56 max-sm:top-40 mt-2 flex flex-col gap-6 pb-4 overflow-x-hidden overflow-y-auto'>
          {tasks.length === 0 && (
            <div className='w-60 h-36 rounded-xl light-mode-bg-third bg-[#27233e] flex flex-col gap-4 items-center absolute left-[34%] max-sm:left-[60px]'>
              <p className='text-white font-semibold absolute top-8'>Oops! No Task..</p>
              <Link to='/create'>
              <button className='absolute w-28 font-semibold cursor-pointer text-md h-8 rounded-full text-white bg-linear-to-b from-[#967eff] to-[#684ae8] top-16 left-16'>Add New</button>
              </Link> 
              </div>
          )}
          {tasks.map((task,index)=>(
            <motion.div key={index} variants={taskVariants} initial='hidden' animate='visible' custom={index}
            className='relative light-mode-bg-third w-full min-h-32 max-sm:min-h-28 bg-[#27233e] rounded-xl flex items-center'>
                 <div className='absolute w-10 max-sm:w-8 h-10 max-sm:h-8 border border-white rounded-full bg-white top-5 left-6 flex justify-center items-center'>
                 <div style={{ color: taskCategories[task.category]?.color }}>
                   {taskCategories[task.category]?.icon || <FaClipboardList />} 
                  </div>
                 </div>
                 <div className='absolute top-4 left-20 max-sm:left-16 max-sm:ml-1 cursor-default'>
                    <p className='text-xl max-sm:text-lg text-white font-bold w-44 max-sm:max-h-8 overflow-hidden text-ellipsis whitespace-nowrap'>{task.title}</p>
                    <p className='text-[#8a869d] light-mode:text-s text-md max-sm:text-sm'>Created at {new Date(task.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                 </div>
                 <div className='absolute flex gap-3 top-20 max-sm:text-[11.5px] max-sm:left-5 left-6.5'>
                     <div className='flex items-center gap-1 light-mode:text-s text-[#a5a0bd] cursor-default'>
                       <BsDatabase />
                       <p>{task.priority}</p>
                     </div> 
                     <div className='flex items-center gap-1 text-[#f35759] cursor-default light-mode-red'>
                       <FaRegClock className='mt-[2px]' />
                       <p>{task.dueDate}</p>
                     </div> 
                     <div className={`flex items-center gap-1 ${task.status === 'Completed' && 'text-[#5eda99]'} ${task.status === 'In Progress' && 'text-[#bfe23e]'} ${task.status === 'Pending' && 'text-[#f35759] light-mode-red'} cursor-default`}>
                       <RiFlag2Line className='mt-[2px]' />
                       <p>{task.status}</p>
                     </div>
                     <Link to='/update'>
                     <div onClick={()=>onUpdateClick(task._id)} className='flex items-center gap-1 text-[#a5a0bd] cursor-pointer light-mode:text-s'>
                       <RiEditLine className='mt-[2px]' />
                       <p>Update</p>
                     </div>
                     </Link> 
                 </div>
                 <button onClick={()=>handleDelete(task._id)} className='w-28 light-mode-red-button max-sm:w-20 max-sm:h-8 max-sm:text-sm max-sm:left-[73%] max-sm:top-6 h-10 rounded-full border-2 border-[#f35759] absolute left-[85%] text-[#f35759] cursor-pointer'>Delete</button>
            </motion.div>
            ))}
        </div>
       </div>
    </div>
  )
}

export default Home