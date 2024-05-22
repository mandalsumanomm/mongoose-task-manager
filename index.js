const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routs/todoHandler')
const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost/todos')
  .then(() => console.log('connection successful'))
  .catch(() => console.log('connection successful'))


app.use('/todo', todoHandler);



function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.starus(500).json({ error: err });
}


app.listen(3000, () => {
  console.log("server is running on port 3000")
});