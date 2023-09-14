const axios = require('axios')
const COMMON_CONFIG = require('../config/common')

exports.getStates = (req, res) => {
  try {
    const apiUrl = 'https://dev.dellyman.com/api/v3.0/States'

    // Make a GET request using Axios
    axios
      .get(apiUrl)
      .then((response) => {
        // Handle the response data here
        console.log('Response:', response.data)
        return res.json({ data: response.data })
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error)
        return res.json({ error })
      })
  } catch (error) {}
}

exports.init = (req, res) => {
  try {
    const apiUrl = 'https://dev.dellyman.com/api/v3.0/Login'

    if (!req.body) {
      return res.json({ data: 'No payload found' })
    }

    // Data to send in the POST request (if needed)
    const postData = {
      Email: req.body.Email,
      Password: req.body.Password,
    }

    // Make a POST request using Axios
    axios
      .post(apiUrl, postData)
      .then((response) => {
        // Handle the response data here
        console.log('Response:', response.data)
        return res.json({ data: response.data })
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error)
        return res.json({ error })
      })
  } catch (error) {
    // Handle any general errors here
    console.error('Error:', error)
    return res.json({ error })
  }
}

exports.getOrder = async (req, res) => {
  const apiUrl = 'https://dev.dellyman.com/api/v3.0/GetOrder'

  if (!req.body) {
    return res.json({ data: 'No payload found' })
  }

  // Data to send in the POST request (if needed)
  const postData = {
    CustomerID: 945,
    CustomerAuth: COMMON_CONFIG.SECURITY_KEY.DELLYMAN_AUTH,
    OrderID: 50378,
  }
  const headers = {
    Authorization: `Bearer ${COMMON_CONFIG.SECURITY_KEY.DELLYMAN_APIKEY}`,
    'Content-Type': 'application/json',
  }
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(postData),
    })

    const responseData = await response.json()

    // Handle the response data here
    console.log('Response:', responseData)

    if (responseData.ResponseCode !== 101) {
      return res.json({ data: responseData })
    } else {
      return res.json({ error: responseData.ResponseMessage })
    }
  } catch (error) {
    // Handle errors here
    console.error('Error:', error)
    return res.json({ error: error.code })
  }
}

exports.orderQuote = async (req, res) => {
  const apiUrl = 'https://dev.dellyman.com/api/v3.0/GetQuotes'

  if (!req.body) {
    return res.json({ data: 'No payload found' })
  }

  const date = new Date() // Current date and time
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  const formattedDate = date.toLocaleDateString('en-US', options)

  console.log(formattedDate) // Output: 07/04/2021
  // Data to send in the POST request (if needed)
  const postData = {
    CustomerID: 945,
    CustomerAuth: COMMON_CONFIG.SECURITY_KEY.DELLYMAN_AUTH,
    PaymentMode: 'pickup',
    VehicleID: 1,
    PickupRequestedTime: '06 AM to 09 PM',
    PickupRequestedDate: formattedDate,
    PickupAddress: req.body.pharmAddress,
    DeliveryAddress: [req.body.userDeliveryAddress],
    ProductAmount: [],
    PackageWeight: [],
    IsProductOrder: 0,
    IsProductInsurance: 0,
    InsuranceAmount: 0,
    IsInstantDelivery: 0,
  }
  const headers = {
    Authorization: `Bearer ${COMMON_CONFIG.SECURITY_KEY.DELLYMAN_APIKEY}`,
    'Content-Type': 'application/json',
  }
  axios
    .post(apiUrl, postData, {
      headers: headers,
    })
    .then((response) => {
      console.log(response.data) // Print the response data
      res.json(response.data) // Send response to client
    })
    .catch((error) => {
      console.error('Error:', error)
      res.json({ error: 'An error occurred while initializing payment.' }) // Send error response to client
    })
}

exports.bookOrder = async (req, res) => {
 
  if (!req.body==null) {
    return res.json({ data: 'No payload found' })
  }
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  console.log(formattedDate);

const formattedTime = formatTime(currentDate);
console.log(formattedTime);

const newTime = new Date(currentDate.getTime() + 60 * 60 * 1000); // Adding 1 hour in milliseconds
const formattedNewTime = formatTime(newTime);

const newDeliveryTime = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000); // Adding 2 hours in milliseconds
const formattedDeliveryNewTime = formatTime(newDeliveryTime);

console.log("Current Time:", formatTime(currentDate));
console.log("New Time (1 hour added):", formattedNewTime);
console.log("New Delivery Time (2 hours added):", formattedDeliveryNewTime);

  const postData = {
    "CompanyID": 762,
    "PaymentMode": "online",
    "Vehicle": "1",
    "PickUpContactName": req.body.pickUpContactName,
    "PickUpContactNumber": req.body.pickUpContactPhone,
    "PickUpLandmark": "",
    "PickUpGooglePlaceAddress": req.body.pickUpContactAddress,
    "IsInstantDelivery": "0",
    "IsProductOrder": 1,
    "PickUpRequestedTime": `${formattedTime.toString()} to ${formattedNewTime.toString()}`,
    "PickUpRequestedDate": formattedDate.toString(),
    "DeliveryRequestedTime": ` ${formattedNewTime.toString()} to ${formattedDeliveryNewTime.toString()}`,
    "OrderRef": req.body.ref,
    "Packages": [
        {
            "PackageDescription": "drugs",
            "DeliveryContactName": req.body.deliveryContactName,
            "DeliveryContactNumber": req.body.deliveryContactPhone,
            "DeliveryGooglePlaceAddress": req.body.deliveryContactAddress,
            "DeliveryLandmark": "",
            "PickUpCity": req.body.pickUpContactCity,
            "PickUpState":req.body.pickUpContactState,
            "DeliveryCity": req.body.deliveryContactCity,
            "DeliveryState": req.body.deliveryContactState,
            "ProductAmount": parseInt(req.body.productPrice)
        }
    ]
}

  const apiUrl = 'https://dev.dellyman.com/api/v3.0/BookOrder'
  // Set up request headers with Bearer token
  const headers = {
    Authorization: `Bearer ${COMMON_CONFIG.SECURITY_KEY.DELLYMAN_APIKEY}`,
    'Content-Type': 'application/json',
  }
  // Set up request headers with Bearer token
  // Make a POST request using Fetch API
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(postData),
    })

    const responseData = await response.json()

    // Handle the response data here
    console.log('Response:', responseData)

    if (responseData.ResponseCode !== 101) {
      return res.json({ data: responseData })
    } else {
      return res.json({ error: responseData.ResponseMessage })
    }
  } catch (error) {
    // Handle errors here
    console.error('Error:', error)
    return res.json({ error: error.code })
  }
}


function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}

function formatTime(date) {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12) || 12; // Convert to 12-hour format

  return `${formattedHours}:${minutes} ${ampm}`;
}


