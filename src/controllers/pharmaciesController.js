const Pharmacies = require('../models/pharmaciesModel')
const _ = require('lodash')
exports.matchUserToPharmacies = (req, res) => {
  if (req) {
    const { userLongitude, userLatitude } = req.body
    if (userLongitude == null) {
      res.status(400).json({ message: 'longitude is required' })
      return
    }
    if (userLatitude == null) {
      res.status(400).json({ message: 'latitude is required' })
      return
    }
    if (isNaN(userLongitude)) {
      res.status(400).json({ message: 'longitude should be a number' })
      return
    }
    if (isNaN(userLatitude)) {
      res.status(400).json({ message: 'latitude should be a number' })
      return
    }
    const getDistanceBetweenPoints = (
      latitude1,
      longitude1,
      latitude2,
      longitude2,
      unit,
    ) => {
      let theta = longitude1 - longitude2
      let distance =
        60 *
        1.1515 *
        (180 / Math.PI) *
        Math.acos(
          Math.sin(latitude1 * (Math.PI / 180)) *
            Math.sin(latitude2 * (Math.PI / 180)) +
            Math.cos(latitude1 * (Math.PI / 180)) *
              Math.cos(latitude2 * (Math.PI / 180)) *
              Math.cos(theta * (Math.PI / 180)),
        )
      if (unit == 'miles') {
        return Math.round(distance, 2)
      } else if (unit == 'kilometers') {
        return Math.round(distance * 1.609344, 2)
      }
    }
    Pharmacies.getPharmacies((err, result) => {
      if (err) {
        if (err.type == 'no_pharmacies') {
          res.status(204).json({ message: 'no_pharmacies' })
        } else {
          res.status(500).json({ message: 'server_error' })
        }
      } else {
        let pharmaciesNearby = []
        for (let pharmacy of result) {
          const pharmacyLongitude = pharmacy.longitude
          const pharmacyLatitude = pharmacy.latitude
          const unit = 'kilometers'
          const distanceFromPharmacy = getDistanceBetweenPoints(
            pharmacyLatitude,
            pharmacyLongitude,
            userLatitude,
            userLongitude,
            unit,
          )
          console.log(distanceFromPharmacy)
          if (distanceFromPharmacy > 200 && distanceFromPharmacy < 15000) {
            pharmaciesNearby.push(pharmacy)
          }
        }
        if (pharmaciesNearby.length == 0) {
          res.status(200).json({ pharmacies: 'no_pharamacies_nearby' })
        } else {
          res.status(200).json({ pharmacies: pharmaciesNearby })
        }
      }
    })
  }
}

exports.getAllPharmacy = (req, res) => {
  // Get all requests
  Pharmacies.getAll((err, result) => {
    if (err) {
      if (err.type === 'no_pharmacy') {
        res.json({statusCode:404, data: "There are no pharmacies available" })
      } else {
        res.status(500).json({ data: 'An error occurred. Try again.' })
      }
    } else {
      const pharmArray = result.map((item) => ({
        id: item.id,
        name: item.name,
        city: item.city,
        address: item.address,
        state: item.state,
        status: item.status,
        created_at: item.created_at,
      }))
      res.json({statusCode:200, data: pharmArray })
    }
  })
}



exports.getAllPharmacyByCity = (req, res) => {

  if(!req.body.city) return   res.json({statusCode:400, data: "All fields are required"})
let city=req.body.city.toLowerCase()
  console.log(city)
  // Get all requests
  Pharmacies.getPharmByCity(city,(err, result) => {
    if (err) {
      if (err.type === 'no_city_found') {
        res.json({statusCode:404, data: "City is not covered" })
      } else {
        res.json({statusCode:302, data: 'An error occurred. Try again.' })
      }
    } else {
      const pharmArray = {
        id:result[0].id,
        name: result[0].name,
        city: result[0].city,
        address:result[0].address,
        state:result[0].state,
        status: result[0].status,
        created_at:result[0].created_at,
      }
      res.json({ statusCode:200,data: pharmArray })
    }
  })
}


exports.getAllPharmacyByState = (req, res) => {

  if(!req.body.state) return   res.json({statusCode:400, data: "All fields are required"})
  // Get all requests
  Pharmacies.getPharmByState(req.body.state,(err, result) => {
    if (err) {
      if (err.type === 'no_state_found') {
        res.json({statusCode:404, data: "state is not covered" })
      } else {
        res.json({statusCode:500, data: 'An error occurred. Try again.' })
      }
    } else {
      const pharmArray = {
        id: result[0].id,
        name:result[0].name,
        city: result[0].city,
        address: result[0].address,
        state: result[0].state,
        status: result[0].status,
        created_at:result[0].created_at,
      }
      res.json({statusCode:200, data: pharmArray })
    }
  })
}

exports.addPharmacy = (req, res) => {
  try {
    if (_.isEmpty(req.body)) {
        // Simplified the condition for _.isEmpty()
        res.json({ data: 'Enter request body' }) // Updated error message
        return
      }

    const { name, city, state, address } = req.body

    // Define an object to store validation errors
    let errors = ''

    // Perform validation for each field
    if (!name || typeof name !== 'string') {
      errors = 'firstName is required and should be a string'
    }
    if (!city || typeof city !== 'string') {
      errors = 'lastName is required and should be a string'
    }
    if (!state || typeof state !== 'string') {
      errors = 'Status is required and should be a string'
    }
    if (!address || typeof address !== 'string') {
      errors = 'Role is required and should be a string'
    }

    if (name==='') {
      errors = 'Name is cannot be empty'
    } 
    if (address==='') {
        errors = 'Address is cannot be empty'
      } 
      if (state==='') {
        errors = 'State is cannot be empty'
      } 
      if (city==='') {
        errors = 'City is cannot be empty'
      } 
    // Check if there are any validation errors
    if (errors === null) {
      return res.status(400).json({data: errors })
    }
    const currentTimeInMilliseconds = new Date().getTime()

    const payload = {
      name,
      address,
      city,
      state,
      status: true,
      state,
      created_at: currentTimeInMilliseconds,
    }

    // Create admin using your Admin model (assuming it has a static create method)
    Pharmacies.create(payload, (err, result) => {
      if (err) {
        if (err.type === 'pharmacy_exist') {
          return res.json({statusCode:202, data: 'Pharmacy already exists' })
        } else {
          return res.json({statusCode:300, data: 'Server error' })
        }
      } else {
        const pharmData = result
        // Send JSON response
        return res.json({statusCode:200, data: pharmData })
      }
    })
  } catch (error) {
    console.log(error)
    return res.json({statusCode:500, data: 'Internal server error' })
  }
}
