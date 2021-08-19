const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type:String
  },
  icon :{
    type: String
  },
  genre: {
    type: String
  },
  price: {
    type: String
  },
  basic: {
    type: String
  },
  skill: {
    type: String
  }
  
})
module.exports = mongoose.model('Item', schema)