const models = require('../money')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < 10; i++) {
    models.Record.create({ name: `name-${i}`, amount: `${i}` })
  }

  console.log('done!')
})