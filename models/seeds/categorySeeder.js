const models = require('../money')
const db = require('../../config/mongoose')

const category = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < category.length; i++) {
    models.Category.create({
      category: category[i],
    })
  }

  console.log('done!')
})