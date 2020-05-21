// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 準備引入路由模組
const home = require('./modules/home')
const crud = require('./modules/crud')

router.use('/', home)
router.use('/record', crud)

// 匯出路由器
module.exports = router