const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./Models/Todo');
const dotenv = require('dotenv');

const app = express()
dotenv.config({ path: "./config/.env" })
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.URI+'/test');

app.get('/get', (req, res) => {
    Todo.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err)); // Send error with appropriate status
});
app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    console.log(id);
    Todo.findByIdAndUpdate(id, {completed: true})
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err)); // Send error with appropriate status


});
app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    Todo.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err)); // Send error with appropriate status
});

app.post('/add', (req, res) => {
    console.log(req.body);
    const task = req.body.task;
    Todo.create({ task: task })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err)); // Send error with appropriate status
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3001');
});
