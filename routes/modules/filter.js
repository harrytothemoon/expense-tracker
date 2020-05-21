// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Money = require('../../models/money')

// Filter Function
router.get('/', (req, res) => {
  const filter = req.query.filter
  if (filter) {
    Money.find({ category: { $regex: filter } })
      .lean()
      .then(record => res.render('index', { record, filter }))
      .catch(error => console.log(error))
  } else {
    Money.find()
      .lean()
      .then(record => res.render('index', { record, filter }))
      .catch(error => console.log(error))
  }
})

module.exports = router