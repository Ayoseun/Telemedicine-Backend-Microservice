const Requests = require('../models/requestModels')
const _ = require('lodash')
const { generateRandomNumber } = require('../utils/reference_generator')
const EventEmitter = require('events')

const eventEmitter = new EventEmitter()

let clients = []
let facts = []
function sendEventsToAll(newFact) {
  clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(newFact)}\n\n`),
  )
}

// SSE endpoint for dashboard updates
exports.sseDashboardUpdates = (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  }
  res.writeHead(200, headers)

  const data = `data: ${JSON.stringify(facts)}\n\n`

  res.write(data)

  const clientId = Date.now()

  const newClient = {
    id: clientId,
    res,
  }

  clients.push(newClient)

  req.on('close', () => {
    console.log(`${clientId} Connection closed`)
    clients = clients.filter((client) => client.id !== clientId)
  })
}

exports.getAllRequest = (req, res) => {
  try {
    // Get all requests
    Requests.getAll((err, result) => {
      if (err) {
        if (err.type === 'no_request') {
          res.json({
            statusCode: 404,
            message: 'There are no requests at the moment',
          })
        } else {
          res.json({
            statusCode: 503,
            message: 'An error occurred. Try again.',
          })
        }
      } else {
        const requestArray = result.map((item) => ({
          id: item.id,
          name: item.name,
          surname: item.surname,
          phone: item.phone,
          customerlocation: item.customerlocation,
          customercode: item.customercode,
          pickuplocation: item.pickuplocation,
          deliverytype: item.deliverytype,
          status: item.status,
          created_at: item.created_at,
          ref: item.ref,
          items: item.items,
          price: item.price,
          state:item.state,
          city:item.city,
        }))
        res.json({ statusCode: 200, data: requestArray })
      }
    })
  } catch (error) {
    res.json({ statusCode: 500, message: 'Internal server error' })
  }
}

exports.createRequest = (req, res) => {
  // request logic

  if (!req.body)
    return res.json({ statusCode: 400, message: 'Enter request body' })

  const {
    name,
    surname,
    phone,
    customerlocation,
    deliverytype,
    items,
    price,
    state,
    city,
    customercode,
    pickuplocation,
  } = req.body

  // Define an object to store validation errors
  let errors = ''


  if (!phone || typeof phone !== 'string') {
    errors = 'Phone number is required and should be a string'
  }

  if (!customerlocation || typeof customerlocation !== 'string') {
    errors = 'Customer location is required and should be a string'
  }

  if (!deliverytype || typeof deliverytype !== 'string') {
    errors = 'Delivery type is required and should be a string'
  }

  if (!items || typeof items !== 'string') {
    errors = 'Cart Items is required and should be a string'
  }
  if (!price || typeof price !== 'string') {
    errors = 'Price is required and should be a string'
  }
  if (!customercode || typeof customercode !== 'string') {
    errors = 'customercode is required and should be a string'
  }
  if (!state || typeof state !== 'string') {
    errors = 'State is required and should be a string'
  }
  if (!city || typeof city !== 'string') {
    errors = 'City is required and should be a string'
  }
  if (!pickuplocation || typeof pickuplocation !== 'string') {
    errors = 'pickUpLocation is required and should be a string'
  }

  // Check if there are any validation errors
  if (errors != '') return res.json({ statusCode: 400, message: errors })

  try {
    let payload = req.body
    const randomSevenDigitNumber = generateRandomNumber(7)
    console.log(randomSevenDigitNumber)
    const currentTimeInMilliseconds = new Date().getTime()
    payload['phone'] = parseInt(phone)
    payload['created_at'] = currentTimeInMilliseconds
    payload['ref'] = randomSevenDigitNumber
    payload['status'] = 'pending'
    Requests.create(payload, async (err, result) => {
      if (err) {
        if (err.type == 'user_exist') {
          res.json({ statusCode: 400, message: 'user_exist' })
        } else {
          return res.json({
            statusCode: 503,
            message: 'An error occurred. Try again',
          })
        }
      } else {
        requestData = result
        facts.push(result)
        sendEventsToAll(result)

        // Send JSON response
        res.json({ statusCode: 200, data: result })
      }
    })
  } catch (error) {
    return res.json({ statusCode: 500, message: 'Internal server error' })
  }
}

exports.updateRequest = (req, res) => {
  // request logic
  if (!req.body)
    return res.json({ statusCode: 404, message: 'Enter request body' })
  if (req.body) {
    const { id, status } = req.body
    const errors = ''
    // Perform validation for each field
    if (!id || typeof id !== 'string') {
      errors = 'Id is required and should be a string'
    }
    if (!status || typeof status !== 'string') {
      errors = 'Status is required and should be a string'
    }

    // Check if there are any validation errors
    if (errors != '') return res.json({ statusCode: 400, message: errors })
    try {
      Requests.updateStatus(id, status, (err, result) => {
        if (err) {
          if (err.type == 'not_found') {
            return res.json({ statusCode: 404, message: 'This id not found' })
          } else {
            return res.json({
              statusCode: 503,
              message: 'An error occurred. Try again',
            })
          }
        } else {
          return res.json({ statusCode: 200, data: result })
        }
      })
    } catch (error) {
      return res.json({ statusCode: 500, message: 'Internal server error' })
    }
  }
}

exports.aUserRequest = (req, res) => {
  // request logic
  if (!req.body)
    return res.json({ statusCode: 404, data: 'Enter request body' })
  if (req.body) {
    const { customerCode } = req.body
    let errors = ''
    // Perform validation for each field
    if (!customerCode || typeof customerCode !== 'string') {
      errors = 'customerCode is required and should be a string'
    }
  

    // Check if there are any validation errors
    if (errors != '') return res.json({ statusCode: 400, data: errors })
    try {
      Requests.getAUserRequest(customerCode, (err, result) => {
        if (err) {
          if (err.type == 'no_request') {
            return res.json({ statusCode: 404, data: 'User has no request' })
          } else {
            return res.json({
              statusCode: 503,
              data: 'An error occurred. Try again',
            })
          }
        } else {
          return res.json({ statusCode: 200, data: result })
        }
      })
    } catch (error) {
      return res.json({ statusCode: 500, data: 'Internal server error' })
    }
  }
}
