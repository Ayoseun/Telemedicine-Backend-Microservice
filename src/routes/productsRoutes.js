const express = require('express')
const router = express.Router()
const productsControllers = require('../controllers/productsControllers')

router.post('/api/add-bulk-products', productsControllers.addBulkProducts)
router.post('/api/add-product', productsControllers.addProduct)
router.put('/api/update-one-product', productsControllers.updateAProduct)
router.post('/api/get-products-by-name', productsControllers.getProductsByName)
router.post('/api/get-products-by-category', productsControllers.getProductsByCategory)
router.get('/api/get-one-product/:id', productsControllers.getProductById)
router.get('/api/get-one-product/:productcode', productsControllers.getProductByProductcode)
router.get('/api/get-all-products', productsControllers.getAllProducts)
router.get('/api/get-all-products-without-limit', productsControllers.getAllProductsWithoutLimit)
router.get('/api/get-dosage-forms', productsControllers.getProductsDistinctDosageForms)
router.get('/api/get-products-categories', productsControllers.getProductsCategories)

module.exports = router
