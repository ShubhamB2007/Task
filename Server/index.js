const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Task = require('./models/Task')
const taskRoute = require('./routes/tasks')

const mongoose = require('mongoose');
const tasks = require('./seed');

let url = "mongodb+srv://shubhambudhakar:2007shubham@cluster3.l1lyg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3"
 
const connectDB = async () => {
    try {
      await mongoose.connect(url);
      console.log('Connected to DB');
  
      const existingTasks = await Task.find();
      if (existingTasks.length === 0) {
        await Task.insertMany(tasks);
        console.log("Test tasks added successfully");
      } else {
        console.log("Test tasks already exist, skipping insert.");
      }
    } catch (error) {
      console.error('Database connection error:', error);
    }
  };

  connectDB()

app.use(cors({ origin: "*" }));

app.get('/api/ping', (req, res) => {
    res.status(200).send('Server is active');
});


app.get('/', (req,res)=>{
    res.send('Hello World')
})

app.use('/tasks', taskRoute)

app.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening on port ${port}`)
  })
