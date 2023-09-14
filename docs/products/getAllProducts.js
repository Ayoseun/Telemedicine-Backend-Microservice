const getAllProducts = {
    get: {
      // HTTP GET method
      tags: ['Get Products'], // Tag to group related APIs
      description: 'Returns all products', // Brief description of API
      operationId: 'getProducts', // Unique identifier for the API operation
      parameters: [
        {
            in: 'query',
            name: 'page',
            schema: {
                type: 'integer',
                required: true,
                description: 'The page number whose data should be displayed'
            }
        },
        {
            in: 'query',
            name: 'limit',
            schema: {
                type: 'integer',
                description: 'The number of records to be displayed'
            }
        }
      ], // Input parameters for the API
      security: [
        // Array of security configurations required to access the endpoint
        {
          bearerAuth: [], // This endpoint requires a bearer authentication token
        },
      ],
      responses: {
        // Possible HTTP responses from the API
        '200': {
          // HTTP status code
          description: 'Products were obtained', // Description of response
          content: {
            // Response payload
            'application/json': {
              // Payload format
              schema: {
                $ref: '#/components/schemas/getAllProductsResponse', // Reference to response schema
              },
            },
          },
        },
        '204': {
          // HTTP status code 100
          description: 'No products', // Description of response
        },
        '500': {
          // HTTP status code 500 (Internal Server Error)
          description: 'Server error', // Brief description of the response
        },
      },
    },
  }
  
  module.exports = getAllProducts // Exporting the object containing the API definition
  