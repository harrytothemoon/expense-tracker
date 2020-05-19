const express = require('express')
const router = express.Router()

const Money = require('../../models/money')
// 定義首頁路由
router.get('/', (req, res) => {
  res.render('index')
  // Money.find()
  //   .lean()
  //   .then(moneys => res.render('index', { moneys }))
  //   .catch(error => console.error(error))
})

// 匯出路由器
module.exports = router