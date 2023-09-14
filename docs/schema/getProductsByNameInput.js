const getProductsByNameInput = {
    type: 'object',
    properties: {
        productname: {
            type: 'string',
            description: "The product name",
        },
    }
}

module.exports = getProductsByNameInput