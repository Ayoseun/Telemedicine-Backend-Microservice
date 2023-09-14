const productsBasicInfo = require('./productsBasicInfo')
const productsEndpoints = require('./endpoints/productsEndpoints')
const productsTags = require('./productsTags')
const addProductInput = require('./schema/addProductInput')
const addProductResponse = require('./schema/addProductResponse')
const getAllProductsResponse = require('./schema/getAllProductsResponse')
const getAllProductsWithoutLimitResponse = require('./schema/getAllProductsWithoutLimitResponse')
const getProductsByNameInput = require('./schema/getProductsByNameInput')
const getProductsByNameResponse = require('./schema/getProductsByNameResponse')
const getProductsByCategoryInput = require('./schema/getProductsByCategoryInput')
const getProductsByCategoryResponse = require('./schema/getProductsByCategoryResponse')
const getProductByIdResponse = require('./schema/getProductByIdResponse')
const getProductByProductcodeResponse = require('./schema/getProductByProductcodeResponse')
const getProductsDosageFormsResponse = require('./schema/getProductsDosageFormsResponse')
const getProductsCategoriesResponse = require('./schema/getProductsCategoriesResponse')

const productsSwaggerOptions = {
  // Object defining the Swagger configuration
  swaggerDefinition: {
    ...productsBasicInfo, // Merging the basic information with the definition
    components: {
      securitySchemes: {
        bearerAuth: {
          // Defining the security scheme for bearer token authentication
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // Adding the schemas for the APIs
        addProductInput,
        addProductResponse,
        getAllProductsResponse,
        getAllProductsWithoutLimitResponse,
        getProductsByNameInput,
        getProductsByNameResponse,
        getProductsByCategoryInput,
        getProductsByCategoryResponse,
        getProductByIdResponse,
        getProductByProductcodeResponse,
        getProductsDosageFormsResponse,
        getProductsCategoriesResponse
      },
    },
    ...productsEndpoints , // Adding the API endpoints to the definition
    ...productsTags, // Adding the tags to group the APIs
  },
  apis: [], // Array of API file paths to generate documentation from
}


module.exports = productsSwaggerOptions