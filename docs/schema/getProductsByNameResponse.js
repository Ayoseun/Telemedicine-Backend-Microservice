const getProductsByNameResponse = {
    type: 'object',
    properties: {
      products: {
        type: 'array',
        description: 'An array of all pharmplug products',
        items: {
          type: 'object',
            properties: {
              id: {
                type: 'number',
              },
              imageurl: {
                type: 'string',
              },
              category: {
                type: 'string',
              },
              price: {
                type: 'string'
              },
              productname: {
                type: 'string'
              },
              packsize: {
                type: 'string'
              },
              dosageform: {
                type: 'string'
              },
              companyname: {
                type: 'string'
              },
              productcode: {
                type: 'string'
              },
              created_at: {
                type: 'string'
              }
            }
        }
      },
    },
  };
  
  // Export the `getProductsByNameResponse` object so it can be used in other files
  module.exports = getProductsByNameResponse
  