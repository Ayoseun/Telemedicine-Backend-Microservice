// Define an object containing basic information about Waitlist API
const pharmaciesBasicInfo = {
    openapi: '3.0.1', // The version of the OpenAPI specification used by the API
    info: {
      title: 'Pharmplug pharmacies Backend API', // The name of the API
      description: 'This API demonstrates how to incorporate the Pharmplug API to client-side apps', // A brief description of the API's purpose
      version: '1.0.0', // The version of the API
    },
    servers: [
      {
          url: 'http://localhost:9000/',
          description: 'Local server',
      },
      {
        url: 'https://pharmplug-api.onrender.com/',
        description: 'Production server',
      },
    ],
}
  
  // Export the basicInfo object so it can be used in other files
  module.exports = pharmaciesBasicInfo
  
