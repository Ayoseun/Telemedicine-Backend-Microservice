const getProductsDosageForms = {
    get: {
      // HTTP GET method
      tags: ['Get Products'], // Tag to group related APIs
      description: 'Returns all products dosage forms', // Brief description of API
      operationId: 'getProductsDosageForms', // Unique identifier for the API operation
      parameters: [], // Input parameters for the API
      responses: {
        // Possible HTTP responses from the API
        '200': {
          // HTTP status code
          description: 'All dosage forms returned', // Description of response
          content: {
            // Response payload
            'application/json': {
              // Payload format
              schema: {
                $ref: '#/components/schemas/getProductsDosageFormsResponse', // Reference to response schema
              },
            },
          },
        },
        '204': {
          // HTTP status code 100
          description: 'No dosage forms', // Description of response
        },
        '500': {
          // HTTP status code 500 (Internal Server Error)
          description: 'Server error', // Brief description of the response
        },
      },
    },
  }
  
  module.exports = getProductsDosageForms // Exporting the object containing the API definition
  