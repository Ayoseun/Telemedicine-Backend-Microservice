const matchUserToPharmaciesResponse = {
    type: 'object',
    properties: {
      pharmacies: {
        type: 'array',
        description: 'An array of all pharmplug pharmacies close to the user',
        items: {
          type: 'object',
            properties: {
              id: {
                type: 'number',
              },
              name: {
                type: 'string',
              },
              address: {
                type: 'string',
              },
              longitude: {
                type: 'number'
              },
              latitude: {
                type: 'number'
              },
              created_at: {
                type: 'string'
              }
            }
        }
      },
    },
  };
  
  // Export the `matchUserToPharmaciesResponse` object so it can be used in other files
  module.exports = matchUserToPharmaciesResponse
  