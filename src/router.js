const { Router } = require('express')
const { v4: uuid } = require('uuid')

const router = Router()

const database = require('./database.json')

class Product {

  static create({ name, description, price }) {

    // -> product already exist?
    const nameLowercase = name.toLowerCase()
    const result = database.find(product => product.name.toLowerCase() === nameLowercase)
    if (result) throw new Error('Product already exists.')
    
    const product = {
      id: uuid(),
      name,
      description,
      price
    }

    database.push(product)

    return product
  }

  static findById(id) {
    return database.find(product => product.id === id)
  }

  static findByName(name) {
    return database.find(product => product.name === name)
  }

  static delete(id) {
    // TODO:
  }

}

router.post('/', (req, res, next) => {
  try {
    const product = Product.create(req.body)
    console.log(product)
    console.log(JSON.stringify(database, null, 2))
    res.status(201).json(product)
  }
  catch (e) {
    res.status(400).json({ status: e.message })
  }
})

router.get('/findById/:id', (req, res, next) => {
  const product = Product.findById(req.params.id)

  if (product) {
    res.status(200).json(product)
  }
  else {
    res.status(400).json({ status: "Product does not exist." })
  }
})

router.get('/findByName', (req, res, next) => {
  const product = Product.findByName(req.query.name)

  if (product) {
    res.status(200).json(product)
  }
  else {
    res.status(400).json({ status: "Product does not exist." })
  }
})

router.delete('/:id', (req, res, next) => {

})

module.exports = router