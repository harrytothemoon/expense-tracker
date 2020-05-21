// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Money = require('../../models/money')

// Create function
router.get('/create', (req, res) => {
  return res.render('create')
})
router.post('/create', (req, res) => {
  const { name, categoryIcon, date, amount } = req.body
  console.log(req.body)
  return Money.create({ name, categoryIcon, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router