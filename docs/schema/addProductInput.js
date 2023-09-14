// Define an object that represents the expected format of the input for adding a user to the waitlist
const addProductInput = {
    type: 'object',
    properties: {
      imageurl: {
        type: 'string',
        description: "The product image url",
      },
      category: {
        type: 'string',
        description: "The product category",
      },
      price: {
        type: 'string',
        description: "The product price",
      },
      productname: {
        type: 'string',
        description: "The product name",
      },
      packsize: {
        type: 'string',
        description: "The product packsize",
      },
      dosageform: {
        type: 'string',
        description: "The product dosage form",
      },
      companyname: {
        type: 'string',
        description: "The product company name",
      },
      productcode: {
        type: 'string',
        description: "The product unique identifier",
      },
    },
  };
  
  // Export the `WaitlistUserInput` object so it can be used in other files
  module.exports = addProductInput;
  