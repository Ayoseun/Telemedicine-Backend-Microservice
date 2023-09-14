const express = require('express')
const router = express.Router()
const adminControllers = require('../controllers/adminControllers')

router.get('/api/admin/all-admins', adminControllers.getAllAdmin)
router.post('/api/admin/add-admin', adminControllers.createAdmin)
router.post('/api/admin/login-admin', adminControllers.getAnAdmin)
router.put('/api/admin/update-admin', adminControllers.updateAdmin)
router.post('/api/admin/delete-admin', adminControllers.deleteAdmin)

module.exports = router
