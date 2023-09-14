// Define the function to check and replace null values
const checkAndReplaceNull = (data) => {
    // Loop through each object in the data array
    for (const obj of data) {
      // Loop through each key in the object
      for (const key in obj) {
        // Check if the key belongs to the object (not inherited from prototype)
        if (obj.hasOwnProperty(key)) {
          // If the value of the key is null
          if (obj[key] === null) {
            // Check if the key is 'price'
            if (key === 'price') {
              // Replace null value with 0 for 'price' key
              obj[key] = 0;
            } else {
              // Replace null value with an empty string for other keys
              obj[key] = '';
            }
          }
        }
      }
    }
  };
   module.exports  = {
    checkAndReplaceNull
}