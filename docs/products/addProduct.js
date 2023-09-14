const addProduct = {
    post: {
      tags: ['Add Product'], // Tag used to organize endpoints
      description:
        'Add a new product to the database. This API endpoint adds a new product to Pharmplug', // A brief description of what the endpoint does
      operationId: 'addproduct', // Unique identifier for the endpoint operation
      parameters: [], // Array of parameters (in this case, none)
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
              $ref: '#/components/schemas/addProductInput', // Reference to the JSON schema for the input object (defined elsewhere)
            },
          },
        },
      },
      responses: {
        // Configuration for the endpoint response(s)
        '201': {
            // HTTP status code 200 (OK)
            description: 'Added successfully', // Brief description of the response
            content: {
              // Content type of the response (in this case, JSON)
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/addProductResponse', // Reference to the JSON schema for the response object (defined elsewhere)
                },
              },
            },
          },
          '500': {
            // HTTP status code 500 (Internal Server Error)
            description: 'Server error', // Brief description of the response
          },
          '400': {
            // HTTP status code 400
            description: 'Incorrect or empty input', // Brief description of the response
          },
      }
    }
}

module.exports = addProduct