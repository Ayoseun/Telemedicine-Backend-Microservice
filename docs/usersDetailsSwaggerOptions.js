const usersDetailsBasicInfo = require('./usersDetailsBasicInfo')
const usersDetailsEndpoints = require('./endpoints/usersDetailsEndpoints')
const usersDetailsTags = require('./usersDetailsTags')

const usersDetailsSwaggerOptions = {
    // Object defining the Swagger configuration
    swaggerDefinition: {
        ...usersDetailsBasicInfo, // Merging the basic information with the definition
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
                //
              }
        },
        ...usersDetailsEndpoints,
        ...usersDetailsTags,
    },
    apis: [], // Array of API file paths to generate documentation from.
}

module.exports = usersDetailsSwaggerOptions