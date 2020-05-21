const express = require('express')
const router = express.Router()

const Money = require('../../models/money')

//對資料進行處理

// 定義首頁路由
router.get('/', (req, res) => {
  const amount = Money.aggregate([
    {
      $group: {
        _id: null,
        amount: { $sum: "$amount" },
      }
    }
  ]).exec()
  const record = Money.aggregate([
    {
      $project: {
        name: 1,
        category: 1,
        amount: 1,
        date: 1,
        categoryIcon: 1,
      }
    }
  ]).exec()
  Promise.all([amount, record])
    .then(([amount, record]) => {
      const totalamount = amount[0]
      res.render('index', { totalamount, record })
    })
})

// 匯出路由器
module.exports = router