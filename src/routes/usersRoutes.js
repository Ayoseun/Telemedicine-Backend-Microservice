const express = require('express')
const router = express.Router()
const usersControllers = require('../controllers/usersControllers')

router.get('/', usersControllers.greetings)
router.get('/api/users/get-users', usersControllers.getAll)
router.post('/api/users/register', usersControllers.register)
 router.put('/api/users/verify-otp', usersControllers.verifyAccount)
 router.post('/api/users/login', usersControllers.login)
router.patch('/api/users/password-reset', usersControllers.resetPassword)
router.post('/api/users/forgot-password', usersControllers.forgotPassword)
 router.post('/api/users/delete-user', usersControllers.deleteUser)

module.exports = router