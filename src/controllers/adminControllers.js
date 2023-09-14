const Admin = require('../models/adminModels')
const _ = require('lodash')
const { generateRandomNumber } = require('../utils/reference_generator')
const { isValidPassword } = require('../utils/password_validator')

// exports.getAllRequestSSE = (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream')
//   res.setHeader('Cache-Control', 'no-cache')
//   res.setHeader('Connection', 'keep-alive')
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   try {
//     // Send updates every 2 seconds
//     const intervalId = setInterval(() => {
//       const dataJson = JSON.stringify({ request: requestData })
//       // Send a welcome message to the client
//       //res.write(dataJson)
//       res.write(`data: ${dataJson}\n\n`)
//     }, 2000)

//     req.on('close', () => {
//       // When the client closes the connection, stop sending updates
//       clearInterval(intervalId)
//     })
//   } catch (error) {
//     res.write(`data: ${dataJson} - Update from server\n\n`)
//   }
// }

exports.getAllAdmin = (req, res) => {
  // Get all requests
  Admin.getAll((err, result) => {
    if (err) {
      if (err.type === 'no_request') {
        res.status(404).json({ message: 'There are no requests at the moment' })
      } else {
        res.status(500).json({ message: 'An error occurred. Try again.' })
      }
    } else {
      const adminArray = result.map((item) => ({
        id: item.id,
        name: item.name,
        surname: item.surname,
        password: item.password,
        status: item.status,
        email: item.email,
        role: item.role,
        created_at: item.created_at,
        ref: item.ref,
      }))
      res.status(200).json({ data: adminArray })
    }
  })
}

exports.getAnAdmin = (req, res) => {
  try {
    if (_.isEmpty(req.body)) {
      return res.status(400).json({ message: 'Request body is empty' })
    }
    const { email, password } = req.body

    // Define an object to store validation errors
    const errors = ''

    // Perform validation for each field
    if (!email || typeof email !== 'string') {
      errors = 'Email is required and should be a string'
    }

    if (!password || password.length < 8) {
      errors = 'Password must be at least 8 characters long. '
    }
    if (!isValidPassword(password)) {
      errors =
        'Password must contain at least one capital letter, one number, and one special symbol. '
    }

    // Check if there are any validation errors
    if (errors === null) {
      return res.status(400).json({ message: errors })
    }
    console.log(req.body)
    Admin.getOneAdmin(email, password, (err, result) => {
      if (err) {
        console.log(err)
        if (err.type === 'no_admin_found') {
          res.json({ data: 'Admin not found' })
        } else {
          resjson({ data: 'An error occurred. Try again.' })
        }
      } else {
        console.log(result)
        if (result['password'] !== password) {
          res.json({ data: 'Incorrect password' })
        } else {
          res.json({ data: result })
        }
      }
    })
  } catch (error) {
    res.json({ data: error })
  }
}

exports.createAdmin = (req, res) => {
  try {
    if (_.isEmpty(req.body)) {
      return res.status(400).json({ message: 'Request body is empty' })
    }

    const {
      name,
      surname,
      email,
      password,
      confirmPassword,
      status,
      role,
    } = req.body

    // Define an object to store validation errors
    const errors = ''

    // Perform validation for each field
    if (!email || typeof email !== 'string') {
      errors = 'Email is required and should be a string'
    }

    if (!password || password.length < 8) {
      errors = 'Password must be at least 8 characters long. '
    }
    if (!isValidPassword(password)) {
      errors =
        'Password must contain at least one capital letter, one number, and one special symbol. '
    }
    // Perform validation for each field
    if (!name || typeof name !== 'string') {
      errors = 'firstName is required and should be a string'
    }
    if (!surname || typeof surname !== 'string') {
      errors = 'lastName is required and should be a string'
    }
    if (!status || typeof status !== 'boolean') {
      errors = 'Status is required and should be a boolean'
    }
    if (!role || typeof role !== 'string') {
      errors = 'Role is required and should be a string'
    }
    // Check if there are any validation errors
    if (errors === null) {
      return res.status(400).json({ message: errors })
    }
    const currentTimeInMilliseconds = new Date().getTime()
    const payload = {
      name,
      surname,
      email,
      password,
      confirmPassword,
      status,
      role,
      created_at: currentTimeInMilliseconds,
    }

    // Create admin using your Admin model (assuming it has a static create method)
    Admin.create(payload, (err, result) => {
      if (err) {
        if (err.type === 'user_exist') {
          return res.json({ data: 'User already exists' })
        } else {
          return res.json({ data: 'Server error' })
        }
      } else {
        const adminData = result
        // Send JSON response
        return res.json({ data: adminData })
      }
    })
  } catch (error) {
    console.log(error)
    return res.json({ data: 'Internal server error' })
  }
}

// Helper function to validate email format
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

exports.updateAdmin = (req, res) => {
  console.log(req.body);

  const { id, status, name,surname, role, password } = req.body;
  let errors = '';

  if (!password || password.length < 8) {
    errors += 'Password must be at least 8 characters long. ';
  }
  if (!isValidPassword(password)) {
    errors +=
      'Password must contain at least one capital letter, one number, and one special symbol. ';
  }
  if (!name || typeof name !== 'string') {
    errors += 'firstName is required and should be a string. ';
  }
  if (!surname || typeof surname !== 'string') {
    errors += 'Lastname is required and should be a string. ';
  }
  if (status === undefined || typeof status !== 'boolean') {
    errors += 'Status is required and should be a boolean. ';
  }
  if (!role || typeof role !== 'string') {
    errors += 'Role is required and should be a string. ';
  }

  // Check if there are any validation errors
  if (errors) {
    return res.json({ data: errors });
  }

  try {
    const currentTimeInMilliseconds = new Date().getTime()
    const payload = {
      id,
      name,
      surname,
      password,
      status,
      role,
      created_at: currentTimeInMilliseconds, // Ensure `currentTimeInMilliseconds` is defined
    };

    console.log(payload);

    Admin.updateStatus(payload, (err, result) => {
      if (err) {
        if (err.type == 'admin_not_found') {
          res.json({ data: 'That email does not exist' });
        } else {
          res.json({ data: 'An error occurred. Try again' });
        }
      } else {
        res.json({ data: result });
      }
    });
  } catch (error) {
    res.json({ data: error.message }); // Use `error.message` to provide better error details
  }
};

exports.deleteAdmin = (req, res) => {

 
    const { id } = req.body
 
 
   try {
      Admin.deleteAdmin(id, (err, result) => {
        if (err) {
          if (err.type ===  'No_admin_found') {
            res.json({data: 'That id does not exist' })
          } else {
            res.json({data: 'An error occurred. Try again' })
          }
        } else {
          res.json({ data: result })
        }
      })
    } catch (error) {
      res.json({ data: error })
    }
  
}


