// Define an object that represents the expected format of the response for the get-dosage-forms endpoints
const getProductsDosageFormsResponse = {
    type: 'object',
    properties: {
      dosage_forms: {
        type: 'array',
        description: 'An array of all pharmplug products dosage forms',
        items: {
          type: 'string'
        }
      },
    },
  };
  
  // Export the `getProductsDosageFormsResponse` object so it can be used in other files
  module.exports = getProductsDosageFormsResponse
  