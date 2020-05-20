const models = require('../money')
const db = require('../../config/mongoose')
const categoryList = require('./categoryList.json').category

db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < 5; i++) {
    let randomCategory = Math.floor(Math.random() * categoryList.length)
    let date = new Date()
    models.create({
      name: `name-${i}`,
      amount: `${i}`,
      category: categoryList[randomCategory].name,
      categoryIcon: categoryList[randomCategory].icon,
    })
  }

  console.log('done!')
})