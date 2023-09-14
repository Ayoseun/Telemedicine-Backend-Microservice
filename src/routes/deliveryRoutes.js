const express = require('express')
const router = express.Router()
const deliveryControllers = require('../controllers/deliveryController')

router.get('/api/all-states', deliveryControllers.getStates)
 router.post('/api/delivery/delivery-auth', deliveryControllers.init)
 router.post('/api/delivery/book-order', deliveryControllers.bookOrder)
 router.post('/api/delivery/get-order', deliveryControllers.getOrder)
 router.post('/api/delivery/order-quote', deliveryControllers.orderQuote)

module.exports = router