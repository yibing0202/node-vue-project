const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  banner: {
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
  skinNum: {
    type: Number
  },
    upMain: {
      type: String
    },
    upLess: {
      type: String
    },
    sumSkills: {
      type: String
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
    CD: {
      type: String
    },
    deplete: {
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
  inscription: {
   icon: {
     type: String
   },
   name: {
    type: String
  },
  descriptions: {
    type: String
  }
  },
    partners: {
     hero: {
       type: mongoose.SchemaTypes.ObjectId, ref: "Hero"
     },
     avatar: {
       type: String
     },
     descriptions: {
       type: String
     }
    },
    reRestrained : {
      hero: {
        type: mongoose.SchemaTypes.ObjectId, ref: "Hero"
      },
      avatar: {
        type: String
      },
      descriptions: {
        type: String
      }
     },
     restrained : {
      hero: {
        type: mongoose.SchemaTypes.ObjectId, ref: "Hero"
      },
      avatar: {
        type: String
      },
      descriptions: {
        type: String
      }
     }
})
module.exports = mongoose.model('Hero', schema,'heroes')