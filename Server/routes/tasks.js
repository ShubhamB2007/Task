    const express = require('express')
    const Task = require('../models/Task')
    const router= express.Router()

    router.get('/',async (req,res)=>{

        const searchData = req.query.search;
        const userId = req.query.userId
        let query = {userId} 
        if(searchData){ 
            query={
            $or:[
                {title:{$regex: searchData, $options:"i"}}
      ]
    }
  }
        try {
            const tasks = await Task.find(query)
            if(!tasks) return res.status(404).json({message:"No task found"})
            res.json(tasks)
        } catch (error) {
            console.log(error)
        }
    })

    router.delete('/:id', async (req,res)=>{
        try {
            const {id} = req.params
            const result = await Task.findByIdAndDelete(id)
            res.json(result)
        } catch (error) {
            console.log(error) 
        }
    })

    router.delete('/title/:name', async (req,res)=>{
        try {
            const {name} = req.params
            const result = await Task.findOneAndDelete({ title: { $regex: `^${name}$`, $options: 'i' } });
        
            if (!result) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.json(result);
        } catch (error) {
            console.log(error) 
        }
    })


    router.post('/', async (req,res)=>{
        try {
            const {title,date:dueDate,status,category,priority,userId} = req.body
            const newTask = new Task({title,dueDate,status,category,priority,userId}) 
            const saveTask = await newTask.save()
            res.json(saveTask)
        } catch (error) {
            
        }
    })

    router.put('/:id',async (req,res)=>{
        console.log("Received PUT request");    
        console.log("Request Body:", req.body); 

        try {
            const {id}= req.params
            const {title,date:dueDate,status,category,priority} = req.body
            const result =  await Task.findByIdAndUpdate(id, {title,dueDate,status,category,priority},{new:true})
            res.json(result)
            
        } catch (error) {
            console.log(error)
        }
    })

    router.put('/title/:name',async (req,res)=>{
        console.log("Received PUT request");    

        try {
            const {name}= req.params
            const result =  await Task.findOneAndUpdate({ title: { $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } }, {status:'Completed'},{new:true})
            res.json(result)
            
        } catch (error) {
            console.log(error)
        }
    })

    module.exports = router