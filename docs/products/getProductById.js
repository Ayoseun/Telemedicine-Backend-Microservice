const getProductById = {
    get: {
      // HTTP GET method
      tags: ['Get Products'], // Tag to group related APIs
      description: 'Returns product with the id', // Brief description of API
      operationId: 'getProducts', // Unique identifier for the API operation
      parameters: [
        {
            in: 'path',
            name: 'id',
            schema: {
                type: 'integer',
                required: true,
                description: 'The id of the product to display'
            }
        }
      ], // Input parameters for the API
      responses: {
        // Possible HTTP responses from the API
        '200': {
          // HTTP status code
          description: 'Product with the id is returned', // Description of response
          content: {
            // Response payload
            'application/json': {
              // Payload format
              schema: {
                $ref: '#/components/schemas/getProductByIdResponse', // Reference to response schema
              },
            },
          },
        },
        '204': {
          // HTTP status code 100
          description: 'No product', // Description of response
        },
        '500': {
          // HTTP status code 500 (Internal Server Error)
          description: 'Server error', // Brief description of the response
        },
      },
    },
  }
  
  module.exports = getProductById // Exporting the object containing the API definition
  