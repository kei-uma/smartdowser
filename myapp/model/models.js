var mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
  name: {
    type: String,
    default: "", 
  },  
  x: {
    type: Number,
    default: ""
  },
  y: {
    type: Number,
    default: ""
  },
  step: {
    type: Number,
    default: ""
  }
});

module.exports = { Todo: Todo }