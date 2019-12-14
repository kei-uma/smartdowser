var mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: {
    type: String,
    default: "", 
  },  
  phase: {
    type: String,
    default: ""
  }
});

module.exports = { User: User }