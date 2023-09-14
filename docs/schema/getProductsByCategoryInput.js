const getProductsByCategoryInput = {
    type: 'object',
    properties: {
        category: {
            type: 'string',
            description: "The category name",
        },
    }
}

module.exports = getProductsByCategoryInput