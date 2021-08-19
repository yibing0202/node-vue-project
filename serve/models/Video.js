const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  categories: [{
    type: mongoose.SchemaTypes.ObjectId , ref: "Category"
  }],
    title: {
      type: String
    },
    avatar: {
      type: String
    },
    num: {
      type: String
    },
    time: {
      type:String
    }
},{ timestamps:true })
module.exports = mongoose.model('Video',schema,'videos')