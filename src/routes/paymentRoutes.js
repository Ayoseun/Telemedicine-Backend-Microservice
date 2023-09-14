const express = require('express')
const router = express.Router()
const paymentControllers = require('../controllers/paymentControllers')

router.post('/api/initialize-payment', paymentControllers.initializePayments)
router.post('/api/verify-payment', paymentControllers.verifyPayment)
router.get('/api/payments/get-all', paymentControllers.getAllPayments)

module.exports = router