import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { useState, useEffect } from 'react';

const Settings = ({theme,setTheme}) => {

  const [selectedTheme, setSelectedTheme] = useState(theme)

  const handleSelectedTheme = (selectedTheme)=>{
    setSelectedTheme(selectedTheme)
    setTheme(selectedTheme)
  }

  useEffect(() => {
    localStorage.setItem('theme', selectedTheme);
    setTheme(selectedTheme);
    if (selectedTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [selectedTheme, setTheme]);



  return (
    <div className='absolute w-[80%] h-full left-[20%] bg-[#0a061d] light-mode-bg-main max-sm:top-0 max-sm:left-0 max-sm:w-full'>
      <div className='absolute w-full h-full bg-[#1a1631] rounded-l-[50px] flex justify-center light-mode-bg-secondary max-sm:rounded-xl'>
         <p className='text-white font-semibold absolute top-28 text-xl left-32 light-mode:text-black max-sm:top-20 max-sm:left-12'>Theme</p>
         <div className='w-[80%] h-12 bg-[#27233e] light-mode-bg-third absolute top-40 rounded-xl flex gap-6 pl-12 items-center max-sm:top-32'> 
            <div onClick={()=>handleSelectedTheme('dark')}  className='w-8 h-8 rounded-lg bg-black cursor-pointer flex justify-center items-center'> 
              { selectedTheme === "dark" && 
             <div className='check bg-green-600 rounded-full w-4 h-4 flex justify-center items-center text-sm font-bold'>
                <FaCheck />
              </div>
               } 
            </div>
            <div onClick={()=>handleSelectedTheme('light')}  className='w-8 h-8 rounded-lg bg-white cursor-pointer flex justify-center items-center'>
              {  selectedTheme === "light" && 
               <div className='check bg-green-600 rounded-full w-4 h-4 flex justify-center items-center text-sm font-bold text-white'>
                  <FaCheck />
                </div>
                }
            </div>
         </div>
      </div>
    </div>
  )
}

export default Settings