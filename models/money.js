const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  }
})

const categorySchema = new Schema({
  category: {
    type: String,
    required: true
  }
})

const Record = mongoose.model('Record', recordSchema)
const Category = mongoose.model('Category', categorySchema)

module.exports = { Record, Category }