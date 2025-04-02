import React from 'react'
import { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";
import {toast} from 'react-toastify'
import "react-datepicker/dist/react-datepicker.css"; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import {motion} from 'framer-motion'

const SpeechVariants = {
  hidden:{ opacity:0, y:30 },
  visible:{ opacity:1, y:0,
   transition:{ delay: 0.5, duration:0.4}
  }
}

const CreateVoice = ({setTasks, getData}) => {

  const navigate = useNavigate()

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const [date, setDate] = useState(formatDate(new Date()));
   const [title, setTitle] = useState('')
   const [status, setStatus] = useState('Pending')
   const [category, setCategory] = useState('Work')
   const [priority, setPriority] = useState('Medium')
   const [showCategory, setShowCategory] = useState(false);
   const [other, setOther] = useState('')
   const [deleteTask, setDeleteTask] = useState('')
   const [markTask, setMarkTask] = useState('')

   const taskData = {date,title,status,category,priority}

  
      const { transcript, browserSupportsSpeechRecognition, resetTranscript, listening } = useSpeechRecognition()
      useEffect(() => {
        if (!listening && transcript) {
            handleTranscript(transcript);
        }
        let silenceTimeout = setTimeout(() => {
            SpeechRecognition.stopListening();
        }, 3000); 
    
        return () => clearTimeout(silenceTimeout);
    }, [transcript, listening]);

      const handleTranscript = (command)=>{
         const lowerCaseCommand = command.toLowerCase();
         console.log(lowerCaseCommand)

         if(lowerCaseCommand.includes('add')){
            setShowCategory(true);
            let task = lowerCaseCommand.replace('add', '').trim();
            if (task) {
            task = task.charAt(0).toUpperCase() + task.slice(1);
            setTitle(task);
            console.log(task)
        }
         } else if(lowerCaseCommand.includes('delete')){
              let task = lowerCaseCommand.replace('delete', '').trim();
              setDeleteTask(task)
              setOther('delete')
         }
          else if(lowerCaseCommand.includes('mark')){
            let task = lowerCaseCommand.replace('mark', '').trim();
            setMarkTask(task)
            setOther('mark')
         }
      }
   
   const StartListening = () => SpeechRecognition.startListening({ continuous: true, language: "en-US", interimResults: true  });
   const StopListening = () => SpeechRecognition.stopListening();

   const handleSubmit = async()=>{
    console.log(taskData)
    try {
      const res = await axios.post('http://localhost:3000/tasks', taskData )
      setTasks(prevTasks => [...prevTasks, res.data])
      console.log(res.data)
      toast.success('Task Created Sucessfully!', {
              position: "top-right",
      });
      navigate('/')
    } catch (error) {
      console.log(error) 
    }}

    const handleDelete = async()=>{
      console.log("I'm delete")
      const cleanedTask = deleteTask.replace(/[.,!?]$/, '').trim(); 
       try {
         const res = await axios.delete('http://localhost:3000/tasks/title/' + cleanedTask  )
         await getData()
         toast.success('Task Deleted Successfully!', {
                 position: "top-right",
               });
         console.log(res.data)
         navigate('/')
       } catch (error) {
         console.log(error)
       }
    }

    const handleMark = async() =>{
      console.log('Im Mark')

      const cleanedTask = markTask.replace(/[.,!?]$/, '').trim(); 

      try {
        const res = await axios.put(`http://localhost:3000/tasks/title/` + cleanedTask)
        await getData()
        toast.success('Task is Now Marked As Complete', {
                position: "top-right",
        });
        console.log(res.data)
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    }

   if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div className='absolute w-[80%] max-sm:w-full h-full left-[20%] max-sm:left-0 max-sm:top-20 bg-[#0a061d]  light-mode-bg-main'>
       <div className='absolute w-full h-full bg-[#1a1631] rounded-l-[50px] max-sm:rounded-l-xl max-sm:rounded-r-xl flex justify-center  light-mode-bg-secondary'>
           <p className='text-2xl font-bold text-white absolute top-11 mr-10 max-sm:mr-0 max-sm:mt-2 max-sm:text-40 light-mode:text-black'>Add/Delete/Mark By Speech</p>
           <motion.div variants={SpeechVariants} initial='hidden' animate='visible' className='flex justify-center h-[550px] absolute top-36'>
           <div className='w-[600px] max-sm:w-[335px] max-sm:mr-0 h-72 border border-gray-700 absolute top-0 mr-10 rounded-xl'>
              <textarea className='absolute w-full h-52 border-b-gray-700 outline-none text-white font-semibold p-3 placeholder-text cursor-not-allowed'
               value={
                transcript ||
                "Command Add (Your Task) > To Add Your Task\n" +
                "Command Delete (Your Task) > To Delete Your Task\n" +
                "Command Mark (Your Task) > To Mark Your Task as Completed"
              }
              style={{ color: transcript ? "white" : "rgb(120, 120, 120)" }}
              readOnly></textarea>
              <div className='absolute flex w-full top-52 h-20 gap-6 max-sm:gap- justify-center'>
                  <button onClick={resetTranscript} className='font-semibold cursor-pointer h-10 rounded-full text-white bg-linear-to-b from-[#967eff] to-[#684ae8] w-36 max-sm:w-24 max-sm:h-8 max-sm:text-[10px]'>Clear</button>
                  { listening ? 
                  <button onClick={StartListening} className='font-semibold cursor-pointer h-10 rounded-full text-white bg-linear-to-b from-[#967eff] to-[#684ae8] w-36 max-sm:w-24 max-sm:h-8 max-sm:text-[10px]'>Listening...</button>:
                  <button onClick={StartListening} className='font-semibold cursor-pointer h-10 rounded-full text-white bg-linear-to-b from-[#967eff] to-[#684ae8] w-36 max-sm:w-24 max-sm:h-8 max-sm:text-[10px]'>Start Listening</button>
                } { listening ?
                  <button onClick={StopListening} className='font-semibold cursor-pointer h-10 rounded-full text-red-600 bg-linear-to-b from-[#967eff] to-[#684ae8] w-36 max-sm:w-24 max-sm:h-8 max-sm:text-[10px]'>Stop To Save</button>:
                  <></>
                }
              </div>
            </div> 
         { showCategory && 
         <div className='mr-9 max-sm:mr-0 mt-[325px]'>
          <label className='text-white font-semibold mr-3'>Category:</label>
            <select onChange={(e)=>setCategory(e.target.value)} className='w-[500px] light-mode-bg-third max-sm:w-52 max-sm:ml-0.5 h-10 rounded-lg bg-[#27233e] text-white cursor-pointer pr-2 font-semibold outline-none pl-2'>    
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
          }
             { other.length === 0 ? (
           <button onClick={handleSubmit} className='w-64 max-sm:w-56 h-10 max-sm:mr-0 max-sm:top-[400px] max-sm:ml-2 rounded-xl bg-[#ffd88d] font-semibold cursor-pointer hover:bg-[#e5bf7a] hover:duration-200 mr-10 top-[400px] absolute light-mode-black-button'>Save Changes</button>
          ) : ( other.includes('delete') ? (
            <button onClick={handleDelete} className='w-64 max-sm:w-56 h-10 max-sm:mr-0 max-sm:top-[400px] max-sm:ml-2 rounded-xl bg-[#ffd88d] font-semibold cursor-pointer hover:bg-[#e5bf7a] hover:duration-200 mr-10 top-[400px] absolute light-mode-black-button'>Save Changes</button>
          ): (<button onClick={handleMark} className='w-64 max-sm:w-56 h-10 max-sm:mr-0 max-sm:top-[400px] max-sm:ml-2 rounded-xl bg-[#ffd88d] font-semibold cursor-pointer hover:bg-[#e5bf7a] hover:duration-200 mr-10 top-[400px] absolute light-mode-black-button'>Save Changes</button>
           ))}
           </motion.div>
       </div>
    </div> 
  )
}

export default CreateVoice;