const express = require('express')
const router = express.Router()

const models = require('../../models/money')
// 定義首頁路由
router.get('/', (req, res) => {
  models.find()
    .lean()
    .then(record => res.render('index', { record }))
    .catch(error => console.error(error))
})

// 匯出路由器
module.exports = router