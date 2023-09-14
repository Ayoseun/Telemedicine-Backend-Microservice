const pharmaciesBasicInfo = require('./pharmaciesBasicInfo')
const pharmaciesEndpoints = require('./endpoints/pharmaciesEndpoints')
const pharmaciesTags = require('./pharmaciesTags')
const matchUserToPharmaciesInput = require('./schema/matchUserToPharmaciesInput')
const matchUserToPharmaciesResponse = require('./schema/matchUserToPharmaciesResponse')

const pharmaciesSwaggerOptions = {
    // Object defining the Swagger configuration
    swaggerDefinition: {
      ...pharmaciesBasicInfo, // Merging the basic information with the definition
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
          matchUserToPharmaciesInput,
          matchUserToPharmaciesResponse,
        },
      },
      ...pharmaciesEndpoints , // Adding the API endpoints to the definition
      ...pharmaciesTags, // Adding the tags to group the APIs
    },
    apis: [], // Array of API file paths to generate documentation from
  }
  
  
  module.exports = pharmaciesSwaggerOptions