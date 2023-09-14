const Coverage = require('../models/coverageModel')
const _ = require('lodash')

exports.getAllLocation = (req, res) => {
  // Get all requests
  Coverage.getAll((err, result) => {
    if (err) {
      if (err.type === 'no_location_found') {
        res.status(404).json({ message: 'There are no requests at the moment' })
      } else {
        res.status(500).json({ message: 'An error occurred. Try again.' })
      }
    } else {
      const coverageArray = result.map((item) => ({
        id: item.id,
        city: item.city,
        state:item.state,
        isactive: item.isactive,
        created_at: item.created_at,
      }))
      res.json({ statusCode: 200, data: coverageArray })
    }
  })
}

exports.getByCity = (req, res) => {
  if (!req.body.city)
    return res.json({ statusCode: 400, data: 'City field is required' })
  let city = req.body.city.toLowerCase()
  console.log(city)
  // Get all requests
  Coverage.getLocationByCity(city, (err, result) => {
    if (err) {
      if (err.type === 'no_city_found') {
        res.json({
          statusCode: 404,
          message: 'There are no requests at the moment',
        })
      } else {
        res.json({ statusCode: 302, message: 'An error occurred. Try again.' })
      }
    } else {
      // const pharmArray = result.map((item) => ({
      //   id: item.id,
      //   name: item.name,
      //   city: item.city,
      //   address: item.address,
      //   state: item.state,
      //   isactive: item.isactive,
      //   created_at: item.created_at,
      // }))
      res.json({ statusCode: 200, data: result})
    }
  })
}

exports.getByState = (req, res) => {
  if (!req.body.state)
    return res.json({ statusCode: 400, data: 'All fields are required' })
 
    let state = req.body.state.toLowerCase()
    console.log(state)
  // Get all requests
  Coverage.getLocationByState(state, (err, result) => {
    if (err) {
      if (err.type === 'no_state_found') {
        res.json({
          statusCode: 404,
          message: 'This state is not available at the moment',
        })
      } else {
        res.json({ statusCode: 500, message: 'An error occurred. Try again.' })
      }
    } else {
   
      const coverageArray = result.map((item) => ({
        id: item.id,
        city: item.city,
        state:item.state,
        isactive: item.isactive,
        created_at: item.created_at,
      }))
      res.json({ statusCode: 200, data: coverageArray })
    }
  })
}

exports.addlocation = (req, res) => {
  try {
    if (_.isEmpty(req.body)) {
      // Simplified the condition for _.isEmpty()
      res.json({ data: 'Enter request body' }) // Updated error message
      return
    }

    const { city, state } = req.body

    // Define an object to store validation errors
    let errors = ''

    // Perform validation for each field
    if (!state || typeof state !== 'string') {
      errors = 'state is required and should be a string'
    }
    // Perform validation for each field
    if (!city || typeof city !== 'string') {
      errors = 'city is required and should be a string'
    }
    // Check if there are any validation errors
    if (errors === null) {
      return res.json({ statusCode: 400, data: errors })
    }
    const currentTimeInMilliseconds = new Date().getTime()

    const payload = {
      city,
      state,
      isactive: true,

      created_at: currentTimeInMilliseconds,
    }

    // Create admin using your Admin model (assuming it has a static create method)
    Coverage.create(payload, (err, result) => {
      if (err) {
        if (err.type === 'location_exist') {
          return res.json({ statusCode: 202, data: 'location already exists' })
        } else {
          return res.json({ statusCode: 300, data: 'Server error' })
        }
      } else {
        // Send JSON response
        return res.json({ statusCode: 200, data: result })
      }
    })
  } catch (error) {
    console.log(error)
    return res.json({ statusCode: 500, data: 'Internal server error' })
  }
}
