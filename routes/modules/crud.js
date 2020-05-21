// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Money = require('../../models/money')

// Create function
router.get('/create', (req, res) => {
  return res.render('create')
})
router.post('/create', (req, res) => {
  const { name, Category, date, amount } = req.body
  let [category, categoryIcon] = Category.split('/')
  return Money.create({ name, category, categoryIcon, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Edit Function
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Money.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})
router.put('/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, Category, date, amount } = req.body
  let [category, categoryIcon] = Category.split('/')
  return Money.findById(id)
    .then(record => {
      record.name = name
      record.category = category
      record.categoryIcon = categoryIcon
      record.date = date
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

// Delete Function
router.delete('/:id/delete', (req, res) => {
  const id = req.params.id
  return Money.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router