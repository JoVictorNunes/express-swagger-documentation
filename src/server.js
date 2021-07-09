const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const router = require('./router')
const app = express()
const port = 5000

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/product', router)

app.listen(port, () => { console.log(`App is running on port ${port}`) })
