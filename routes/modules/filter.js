// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Money = require('../../models/money')

// Filter Function
router.get('/', (req, res) => {
  const filter = req.query.filter
  const amountFilter = Money.aggregate([
    { $match: { category: filter } }, {
      $group: {
        _id: null,
        amount: { $sum: "$amount" },
      }
    }
  ]).exec()
  const recordFilter = Money.aggregate([
    {
      $project: {
        name: 1,
        category: 1,
        amount: 1,
        date: 1,
        categoryIcon: 1,
      }
    },
    { $match: { category: filter } }
  ]).exec()
  if (filter) {
    Promise.all([amountFilter, recordFilter])
      .then(([amountFilter, record]) => {
        const totalamount = amountFilter[0]
        res.render('index', { totalamount, record, filter })
        console.log(total, recordFilter)
      })
  } else {
    Promise.all([amountFilter, recordFilter])
      .then(() => res.redirect('/'))
  }
})

module.exports = router