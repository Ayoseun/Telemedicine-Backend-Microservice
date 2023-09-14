const getProductsCategories = {
    get: {
      // HTTP GET method
      tags: ['Get Products'], // Tag to group related APIs
      description: 'Returns all products categories', // Brief description of API
      operationId: 'getProductsCategories', // Unique identifier for the API operation
      parameters: [], // Input parameters for the API
      responses: {
        // Possible HTTP responses from the API
        '200': {
          // HTTP status code
          description: 'All categories returned', // Description of response
          content: {
            // Response payload
            'application/json': {
              // Payload format
              schema: {
                $ref: '#/components/schemas/getProductsCategoriesResponse', // Reference to response schema
              },
            },
          },
        },
        '204': {
          // HTTP status code 100
          description: 'No categories', // Description of response
        },
        '500': {
          // HTTP status code 500 (Internal Server Error)
          description: 'Server error', // Brief description of the response
        },
      },
    },
  }
  
  module.exports = getProductsCategories // Exporting the object containing the API definition
  