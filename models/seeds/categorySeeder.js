// const models = require('../money')
// const db = require('../../config/mongoose')
// const categoryList = require('./categoryList.json').category

// db.once('open', () => {
//   console.log('mongodb connected!')

//   for (let i = 0; i < categoryList.length; i++) {
//     models.create({
//       category: categoryList[i].name,
//       categoryIcon: categoryList[i].icon
//     })
//   }

//   console.log('done!')
// })