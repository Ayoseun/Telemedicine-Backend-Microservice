const getProductByIdResponse = {
    type: 'object',
    properties: {
      product: {
        type: 'object',
        description: 'Returns the product',
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
};
  
// Export the `getProductByIdResponse` object so it can be used in other files
module.exports = getProductByIdResponse