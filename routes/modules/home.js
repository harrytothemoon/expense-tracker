const express = require('express')
const router = express.Router()

const Money = require('../../models/money')

//對資料進行處理

// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  const amount = Money.aggregate([
    {
      $match: {
        userId: userId
      }
    },
    {
      $group: {
        _id: null,
        amount: { $sum: "$amount" },
      }
    }
  ]).exec()
  const record = Money.aggregate([
    {
      $match: {
        userId: userId
      }
    },
    {
      $project: {
        name: 1,
        category: 1,
        amount: 1,
        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        categoryIcon: 1,
      }
    }
  ]).exec()

  Promise.all([amount, record])
    .then(([amount, record]) => {
      const totalamount = amount[0]
      res.render('index', { totalamount, record })
    })
    .catch(error => console.error(error))
})

// 匯出路由器
module.exports = router