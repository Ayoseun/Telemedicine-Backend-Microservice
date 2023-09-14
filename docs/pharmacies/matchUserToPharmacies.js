const matchUserToPharmacies = {
    get: {
      // HTTP GET method
      tags: ['Pharmacies'], // Tag to group related APIs
      description: 'Returns all pharmacies within user location', // Brief description of API
      operationId: 'matchUserToPharmacies', // Unique identifier for the API operation
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
              $ref: '#/components/schemas/matchUserToPharmaciesInput', // Reference to the JSON schema for the input object (defined elsewhere)
            },
          },
        },
      },
      responses: {
        // Possible HTTP responses from the API
        '200': {
          // HTTP status code
          description: 'Available pharmacies', // Description of response
          content: {
            // Response payload
            'application/json': {
              // Payload format
              schema: {
                $ref: '#/components/schemas/matchUserToPharmaciesResponse', // Reference to response schema
              },
            },
          },
        },
        '204': {
          // HTTP status code 100
          description: 'No pharmacies', // Description of response
        },
        '500': {
          // HTTP status code 500 (Internal Server Error)
          description: 'Server error', // Brief description of the response
        },
      },
    },
  }
  
  module.exports = matchUserToPharmacies // Exporting the object containing the API definition
  