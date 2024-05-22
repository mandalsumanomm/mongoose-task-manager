
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const todoSchema = require('../sehemas/todoSchema');
// create model
const Todo = new mongoose.model('Todo', todoSchema);


// Get all active todos
router.get('/', async (req, res) => {
  try {
    const activeTodos = await Todo.find({ status: 'active' });

    res.status(200).json({
      todos: activeTodos
    });
  } catch (err) {
    res.status(500).json({
      error: 'There was an error retrieving the todos',
      details: err.message
    });
  }
});


// Get a todo by id
router.get('/:id', async (req, res) => {
  try {
    const todoId = req.params.id;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        error: 'Todo not found',
      });
    }

    res.status(200).json({
      todo: todo
    });
  } catch (err) {
    res.status(500).json({
      error: 'There was an error retrieving the todo',
      details: err.message
    });
  }
});


// Post todo
router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json({
      message: 'Todo was inserted successfully!',
    });
  } catch (err) {
    res.status(500).json({
      error: 'There was an error',
    });
  }
});

// Post multiple todos
router.post('/all', async (req, res) => {
  try {
    const todos = await Todo.insertMany(req.body);
    res.status(200).json({
      message: 'Todos were inserted successfully!',
      todos: todos
    });
  } catch (err) {
    res.status(500).json({
      error: 'There was an error inserting the todos',
      details: err.message
    });
  }
});

// Put (update) todo
router.put('/:id', async (req, res) => {
  try {
    const todoId = req.params.id;

    const updatedTodo = await Todo.updateOne({ _id: todoId }, {
      $set: {
        status: 'inactive'
      }
    });

    if (updatedTodo.nModified === 0) {
      return res.status(404).json({
        error: 'Todo not found or already inactive',
      });
    }

    res.status(200).json({
      message: 'Todo was updated successfully!',
      todoId: todoId
    });
  } catch (err) {
    res.status(500).json({
      error: 'There was an error updating the todo',
      details: err.message
    });
  }
});


//delete todo
router.delete('/:id', async (req, res) => {
  try {
    const todoId = req.params.id;

    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({
        error: 'Todo not found',
      });
    }

    res.status(200).json({
      message: 'Todo was deleted successfully!',
      deletedTodo: deletedTodo
    });
  } catch (err) {
    res.status(500).json({
      error: 'There was an error deleting the todo',
      details: err.message
    });
  }
});




module.exports = router;

