var mongoose = require('mongoose')

var route = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

var Api = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  requiresAuth: {
    type: Boolean,
    required: true
    
  },
  routes: [route]
})

//User.plugin(require('passport-local-mongoose'))

module.exports = mongoose.model('api', Api)