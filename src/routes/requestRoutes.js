const express = require('express')
const router = express.Router()
const requestControllers = require('../controllers/requestControllers')

router.get('/api/requests/all-request', requestControllers.getAllRequest)
router.post('/api/requests/add-request', requestControllers.createRequest)
router.post('/api/requests/all-user-requests', requestControllers.aUserRequest)
router.put('/api/requests/update-request', requestControllers.updateRequest)
router.get('/api/requests/sse', requestControllers.sseDashboardUpdates)
module.exports = router

