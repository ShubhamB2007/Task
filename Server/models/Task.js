const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
     title:{type:String, required:true},
     priority:{type:String, required:true},
     dueDate:{type:String, required:true},
     status:{type:String, required:true},
     category:{type:String, required:true},
     userId:{type:String,required:true}
    
  }, { timestamps: true });
  
  const Task = mongoose.model('Task', taskSchema);
  
  module.exports = Task;