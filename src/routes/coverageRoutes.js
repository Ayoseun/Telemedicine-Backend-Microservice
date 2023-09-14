const express = require('express')
const router = express.Router()
const locationControllers = require('../controllers/coverageController')

router.get('/api/coverage/get-all', locationControllers.getAllLocation)
router.post('/api/coverage/add-location',locationControllers.addlocation)
router.post('/api/coverage/get-city',locationControllers.getByCity)
 router.post('/api/coverage/get-state',locationControllers.getByState)

module.exports = router