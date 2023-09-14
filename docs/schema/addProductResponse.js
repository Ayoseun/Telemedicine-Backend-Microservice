const addProductResponse = {
    type: 'object',
    properties: {
        message: {
            type: 'string',
            description: 'A message indicating that product was successfully added',        
        },
        data: {
            type: 'object',
            description: 'Newly created product',
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
            }
        }
    }
}

module.exports = addProductResponse