import React, { useEffect, useState } from 'react'
import { FaTasks } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import  {Link, useLocation, useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import { FaUser } from "react-icons/fa";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const Sidebar = () => {

   const [userName, setUserName] = useState('')
   const [show, setShow] = useState(false)
   const navigate = useNavigate()

  const SideVariants = {
    hidden:{ opacity:0, x:-100 },
    visible:{ opacity: 1, x:0,
      transition:{ delay:0.3, duration:0.4, type:'spring', stiffness:200 }
     }
  }

  const location = useLocation()

  useEffect(() => {
    const name = localStorage.getItem('userName')
     if(name){
      setUserName(name)
     }
  }, [])

  const LogOut =()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('email')
    localStorage.removeItem('id')
    window.location.href = '/login'
  }
  

  return (
    <div className={`absolute w-[20%] max-sm:w-[40%] h-full max-sm:h-full z-50 light-mode-bg-main bg-[#0a061d] flex max-sm:flex-col justify-center max-sm:visible max-sm:right-[390px] ${show ? 'max-sm:translate-x-40 max-sm:transform duration-200' : 'max-sm:translate-x-0 transform duration-200'}`}>
        <p className='font-semibold absolute top-16 left-8 max-sm:invisible text-white light-mode:text-black'>General</p>
        <div onClick={()=>setShow(prev=>!prev)} className='max-sm:w-12 max-sm:h-12 flex justify-center items-center absolute left-[170px] bg-[#0a061d] text-white top-5 rounded-lg max-sm:visible invisible'>
           { show ? <FaChevronLeft/> :  <FaChevronRight/>  }
        </div>
        
        <motion.div
        variants={SideVariants} initial='hidden' animate='visible'
        className='absolute top-32 flex flex-col gap-6 max-sm:top-12 max-sm:w-full max-sm:left-6'>
          <Link to='/'>
            <div className={`w-52 max-sm:w-28 flex items-center max-sm:text-xs pl-8 max-sm:h-8 max-sm:pl-2 h-11 light-mode:text-black border border-[#4a465d] rounded-full cursor-pointer ${location.pathname === '/' ? 'bg-[#ffd88d] light-mode-buttons light-mode:text-white shadow-md shadow-[#ffd88d] border-none text-black' : 'hover:bg-[#ffd88d] hover:text-black hover:duration-200 light-mode-hover hover:shadow-[#ffd88d] hover:shadow-md hover:border-none text-white'}`}>
                <FaTasks className='mr-4 max-sm:mr-3' />
                <p>Manage Task</p>
            </div>
            </Link>
            <Link to='/settings'>
            <div className={`w-52 max-sm:w-28 flex items-center max-sm:text-xs pl-8 max-sm:pl-2 max-sm:h-8 h-11 light-mode:text-black border border-[#4a465d] rounded-full cursor-pointer ${location.pathname === '/settings' ? 'bg-[#ffd88d] light-mode-buttons light-mode:text-white shadow-md shadow-[#ffd88d] text-black border-none' : 'hover:bg-[#ffd88d] hover:text-black light-mode-hover hover:duration-200 hover:shadow-[#ffd88d] hover:shadow-md hover:border-none text-white'}`}>
                <IoMdSettings className='mr-4' />
                <p>Settings</p>
            </div>
            </Link>
        </motion.div>

        <motion.div 
        variants={SideVariants} initial='hidden' animate='visible'
        className='w-full h-[35%] top-[60%] absolute flex flex-col items-center gap-4 justify-center'>
            <div className='w-24 h-24 max-sm:w-16 max-sm:h-16 border border-white rounded-full flex items-center justify-center'> 
              <FaUser className='text-gray-500 text-6xl max-sm:text-3xl' />
            </div>
            {userName ? (
              <>
               <p className='text-white font-bold text-lg light-mode:text-black max-sm:text-sm'>{userName}</p>
               <button onClick={LogOut} className='w-44 max-sm:w-28 flex justify-center items-center max-sm:pl-0 h-11 light-mode:text-black border border-[#4a465d] rounded-full cursor-pointer hover:bg-[#ffd88d] hover:text-black hover:duration-200 light-mode-hover hover:shadow-[#ffd88d] hover:shadow-md hover:border-none text-white'>Log Out</button>
               </>
            ):(
              <>
              <p className='text-white font-bold text-lg light-mode:text-black max-sm:text-sm'>Guest</p>
              <button onClick={()=>navigate('login')} className='w-44 max-sm:w-28 flex justify-center items-center max-sm:pl-0 h-11 light-mode:text-black border border-[#4a465d] rounded-full cursor-pointer hover:bg-[#ffd88d] hover:text-black hover:duration-200 light-mode-hover hover:shadow-[#ffd88d] hover:shadow-md hover:border-none text-white'>Login</button>
              </>
            )}
        </motion.div>
    </div>
  )
}

export default Sidebar