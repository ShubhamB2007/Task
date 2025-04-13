import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Create from './components/Create'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios'
import Update from './components/Update'
import Settings from './components/Settings'
import CreateVoice from './components/CreateVoice'
import SpeechTest from './components/SpeechTest'

function App() {

  const getInitialTheme = ()=> localStorage.getItem('theme') || 'dark'
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const [tasks, setTasks] = useState([])
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  
    const getData = async()=>{
       const res = await axios.get(`https://task-backend-ekpr.onrender.com/tasks?search=${searchQuery}`)
       console.log(res.data)
       setTasks(res.data)
    }

    const handleSearch = (e)=>{
      setSearchQuery(e.target.value)
      // console.log(e.target.value)
    }

    useEffect(() => {
      getData()
    }, [searchQuery])

  return (
    <Router>
    <div className={`absolute w-screen h-screen ${theme === 'dark' ? 'dark' : ''}`}>
       <Sidebar/>
       <Routes>
        <Route
        path='/'
        element={<Home tasks={tasks} setTasks={setTasks} onUpdateClick={setSelectedTaskId} handleSearch={handleSearch} getData={getData} />}
        />
       <Route
       path='/create'
       element={<Create setTasks={setTasks}/>}
       />
       <Route
       path='/voice'
       element={<CreateVoice setTasks={setTasks} getData={getData}/>}
       />
       <Route
       path='/test'
       element={<SpeechTest/>}
       />
       <Route
       path='/update'
       element={<Update getData={getData} task={tasks?.find?.(t => t._id === selectedTaskId) || null} setTasks={setTasks} />}
       />
       <Route
       path='/settings'
       element={<Settings theme={theme} setTheme={setTheme}/>}
       />
       </Routes>
    </div>
    </Router>
  )
}

export default App
