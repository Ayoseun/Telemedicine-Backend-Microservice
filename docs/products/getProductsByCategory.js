const getProductsByCategory = {
    get: {
      // HTTP GET method
      tags: ['Get Products'], // Tag to group related APIs
      description: 'Returns all products by category', // Brief description of API
      operationId: 'getProducts', // Unique identifier for the API operation
      parameters: [], // Input parameters for the API
      security: [
        // Array of security configurations required to access the endpoint
        {
          bearerAuth: [], // This endpoint requires a bearer authentication token
        },
      ],
      requestBody: {
        // Configuration for the request body (JSON data that the client sends to the server)
        content: {
          // Content type of the request body (in this case, JSON)
          'application/json': {
            schema: {
              $ref: '#/components/schemas/getProductsByCategoryInput', // Reference to the JSON schema for the input object (defined elsewhere)
            },
          },
        },
      },
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
                $ref: '#/components/schemas/getProductsByCategoryResponse', // Reference to response schema
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
  
  module.exports = getProductsByCategory // Exporting the object containing the API definition
  