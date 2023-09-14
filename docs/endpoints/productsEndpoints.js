const addProduct = require('../products/addProduct')
const getAllProducts = require('../products/getAllProducts')
const getProductsByName = require('../products/getProductsByName')
const getProductsByCategory = require('../products/getProductsByCategory')
const getProductById = require('../products/getProductById') 
const getProductByProductcode = require('../products/getProductByProductcode')
const getProductsDosageForms = require('../products/getProductsDosageForms')
const getProductsCategories = require('../products/getProductsCategories')
const getAllProductsWithoutLimit = require('../products/getAllProductsWithoutLimit')

const productsEndpoints = {
    paths: {
        '/api/add-product' : { // Endpoint for adding a new product
            ...addProduct 
        },
        '/api/get-all-products/?page=4&limit=5': { // Endpoint for fetching products based on page number
            ...getAllProducts
        },
        '/api/get-all-products-without-limit': { // Endpoint for fetching products based on page number
            ...getAllProductsWithoutLimit
        },
        '/api/get-products-by-name': { // Endpoint for fetching products by name
            ...getProductsByName
        },
        '/api/get-products-by-category': { // Endpoint for fetching products by category
            ...getProductsByCategory
        },
        '/api/get-one-product/:id': { // Endpoint for fetching products by id
            ...getProductById
        },
        '/api/get-one-product/:productcode': { // Endpoint for fetching products by productcode
            ...getProductByProductcode
        }, 
        '/api/get-dosage-forms': { // Endpoint for fetching all distint products dosage forms
            ...getProductsDosageForms
        },
        '/api/get-products-categories': { // Endpoint for fetching all distint products categories
            ...getProductsCategories
        }
    }
}

module.exports = productsEndpoints