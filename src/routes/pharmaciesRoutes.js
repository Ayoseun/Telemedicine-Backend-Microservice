const express = require('express')
const router = express.Router()
const pharmaciesControllers = require('../controllers/pharmaciesController')

router.get('/api/match-user-to-pharmacies', pharmaciesControllers.matchUserToPharmacies)
router.post('/api/pharmacy/add-pharmacy',pharmaciesControllers.addPharmacy)
router.get('/api/pharmacy/get-all',pharmaciesControllers.getAllPharmacy)
router.post('/api/pharmacy/get-city-pharmacy',pharmaciesControllers.getAllPharmacyByCity)
router.post('/api/pharmacy/get-state-pharmacy',pharmaciesControllers.getAllPharmacyByState)

module.exports = router