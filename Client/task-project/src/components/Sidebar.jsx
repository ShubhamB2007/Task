import React from 'react'
import { FaTasks } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import  {Link, useLocation} from 'react-router-dom'

const Sidebar = () => {

  const location = useLocation()

  return (
    <div className='absolute w-[20%] max-sm:w-full max-sm:h-20 h-full light-mode-bg-main bg-[#0a061d] flex justify-center'>
        <p className='font-semibold absolute top-16 left-8 max-sm:invisible text-white light-mode:text-black'>General</p>
        <div className='absolute top-32 flex flex-col gap-6 max-sm:top-3 max-sm:flex-row max-sm:w-full max-sm:left-6'>
          <Link to='/'>
            <div className={`w-52 max-sm:w-40 flex items-center pl-8 max-sm:pl-5 h-11 light-mode:text-black border border-[#4a465d] rounded-full cursor-pointer ${location.pathname === '/' ? 'bg-[#ffd88d] light-mode-buttons light-mode:text-white shadow-md shadow-[#ffd88d] border-none text-black' : 'hover:bg-[#ffd88d] hover:text-black hover:duration-200 light-mode-hover hover:shadow-[#ffd88d] hover:shadow-md hover:border-none text-white'}`}>
                <FaTasks className='mr-4 max-sm:mr-3' />
                <p>Manage Task</p>
            </div>
            </Link>
            <Link to='/settings'>
            <div className={`w-52 max-sm:w-40 flex items-center pl-8 h-11 light-mode:text-black border border-[#4a465d] rounded-full cursor-pointer ${location.pathname === '/settings' ? 'bg-[#ffd88d] light-mode-buttons light-mode:text-white shadow-md shadow-[#ffd88d] text-black border-none' : 'hover:bg-[#ffd88d] hover:text-black light-mode-hover hover:duration-200 hover:shadow-[#ffd88d] hover:shadow-md hover:border-none text-white'}`}>
                <IoMdSettings className='mr-4' />
                <p>Settings</p>
            </div>
            </Link>
        </div>
    </div>
  )
}

export default Sidebar