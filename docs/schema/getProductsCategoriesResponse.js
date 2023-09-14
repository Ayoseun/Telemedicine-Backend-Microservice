// Define an object that represents the expected format of the response for the get-dosage-forms endpoints
const getProductsCategoriesResponse = {
    type: 'object',
    properties: {
      categories: {
        type: 'array',
        description: 'An array of all pharmplug products categories',
        items: {
          type: 'string'
        }
      },
    },
  };
  
  // Export the `getProductsDosageFormsResponse` object so it can be used in other files
  module.exports = getProductsCategoriesResponse