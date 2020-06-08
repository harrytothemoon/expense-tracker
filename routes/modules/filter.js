// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Money = require('../../models/money')

// Filter Function
router.get('/', (req, res) => {
  const userId = req.user._id
  const filter = req.query.filter
  const amountFilter = Money.aggregate([
    { $match: { category: filter, userId: userId } }, {
      $group: {
        _id: null,
        amount: { $sum: "$amount" },
      }
    }
  ]).exec()
  const recordFilter = Money.aggregate([
    { $match: { userId: userId, category: filter } },
    {
      $project: {
        name: 1,
        category: 1,
        amount: 1,
        merchant: 1,
        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        categoryIcon: 1,
      }
    }
  ]).exec()
  if (filter) {
    Promise.all([amountFilter, recordFilter])
      .then(([amountFilter, record]) => {
        const totalamount = amountFilter[0]
        res.render('index', { totalamount, record, filter })
      })
  } else {
    Promise.all([amountFilter, recordFilter])
      .then(() => res.redirect('/'))
  }
})

router.get('/month', (req, res) => {
  const userId = req.user._id
  const filter = req.query.filter
  const amountFilter = Money.aggregate([
    { $match: { userId: userId } },
    {
      $group: {
        _id: { $month: "$date" },
        amount: { $sum: "$amount" },
      }
    },
    { $match: { _id: Number(filter) } },
  ]).exec()
  const recordFilter = Money.aggregate([
    { $match: { userId: userId } },
    {
      $project: {
        name: 1,
        category: 1,
        amount: 1,
        merchant: 1,
        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        month: { $month: "$date" },
        categoryIcon: 1,
      }
    },
    { $match: { month: Number(filter) } },
  ]).exec()
  if (filter) {
    Promise.all([amountFilter, recordFilter])
      .then(([amountFilter, record]) => {
        const totalamount = amountFilter[0]
        res.render('index', { totalamount, record, filter })
      })
  } else {
    Promise.all([amountFilter, recordFilter])
      .then(() => res.redirect('/'))
  }
})

module.exports = router