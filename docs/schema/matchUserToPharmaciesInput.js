// Define an object that represents the expected format of the input for adding a user to the waitlist
const matchUserToPharmaciesInput = {
    type: 'object',
    properties: {
      userLongitude: {
        type: 'number',
        description: "The longitude of user's location",
      },
      userLatitude: {
        type: 'number',
        description: "The latitude of user's location",
      },
    },
  };
  
  // Export the `matchUserToPharmaciesInput` object so it can be used in other files
  module.exports = matchUserToPharmaciesInput;
  