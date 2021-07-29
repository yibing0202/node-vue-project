const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  title: {
    type:String
  },
  categories: [{
    type: mongoose.SchemaTypes.ObjectId , ref: "Category"
  }],
  scores: {
    difficult: {
      type: Number
    },
    skill: {
      type: Number
    },
    attack: {
      type: Number
    },
    exist: {
      type: Number
    }
  },
  skills: [{
    icon: {
      type: String
    },
    name: {
      type: String
    },
    detailed: {
      type: String
    },
    descriptions: {
      type: String
    }
  }],
  item1: [{
    type: mongoose.SchemaTypes.ObjectId, ref: "Item"
  }],
  item2: [{
    type: mongoose.SchemaTypes.ObjectId, ref: "Item"
  }],
  useTips: {
    type: String
  },
  resistTips: {
    type: String
  },
  teamTips: {
    type: String
  },
  relations: [{
    partners: {
     hero: {
       type: mongoose.SchemaTypes.ObjectId, ref: "Hero"
     }
    },
    descriptions: {
      type: String
    }
  }]
})
module.exports = mongoose.model('Hero', schema)