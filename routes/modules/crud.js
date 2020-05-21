// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Money = require('../../models/money')
const mongoose = require('mongoose')

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
  const ObjectId = mongoose.Types.ObjectId
  const record = Money.aggregate([
    { $match: { _id: ObjectId(id) } },
    {
      $project: {
        _id: 1,
        name: 1,
        category: 1,
        amount: 1,
        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        categoryIcon: 1,
      }
    }
  ]).exec()
  Promise.all([record])
    .then((record) => {
      const [recordEdit] = record[0]
      res.render('edit', { recordEdit })
    })
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