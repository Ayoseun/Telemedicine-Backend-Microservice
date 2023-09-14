const bcrypt = require('bcryptjs')

const {
  sendEmailPasswordReset,
} = require('../utils/sendEmails/sendEmailPasswordReset')
const Sib = require('sib-api-v3-sdk')
const validator = require('validator') // You need to install this package
const Users = require('../models/usersModels')
const { isValidPassword } = require('../utils/password_validator')
const { generateRandomString } = require('../utils/user_reference_generator')
const { validatePhoneNumber } = require('../utils/phone_validator')
const { sendEmailWeb } = require('../utils/sendEmails/sendEmailWeb')
const { generateOTP } = require('../utils/otp')
const dotenv = require('dotenv')

dotenv.config()
exports.greetings = (req, res) => {
  res.status(200).json({ message: 'Welcome to PharmPlug backend' })
}

// Exporting a function named getAll that handles a GET request for fetching all users.
exports.getAll = (req, res) => {
  // Calling the getAllUsers function from the Users module to retrieve all user records.
  Users.getAllUsers((err, result) => {
    if (err) {
      // If an error occurred during the database query.
      if (err.type === 'no_request') {
        // If the error type indicates that there are no user records.
        res.status(404).json({ message: 'There are no users at the moment' })
      } else {
        // If the error type is not about missing records, indicating a general error.
        res.status(500).json({ message: 'An error occurred. Try again.' })
      }
    } else {
      // If the database query was successful.
      // Creating a new array 'usersArray' by mapping over each item in the result array.
      const usersArray = result.map((item) => ({
        id: item.id,
        firstName: item.name,
        lastName: item.surname,
        status: item.status,
        email: item.email,
        phone: item.phone,
        role: item.role,
        customerCode: item.customercode,
        created_at: item.created_at,
        verified: item.verified,
        ref: item.refcode,
      }))
      // Sending a JSON response containing the 'usersArray'.
      res.json({ data: usersArray })
    }
  })
}

// Exporting a function named 'register' to handle user registration asynchronously.
exports.register = async (req, res) => {
  try {
    // Destructure user input data from the request body.
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
    } = req.body

    // Input validation for each field.
    if (!firstName || firstName === null) {
      return res.json({ statusCode: 400, data: 'FirstName cannot be empty' })
    }
    if (!lastName || lastName === null) {
      return res.json({ statusCode: 400, data: 'LastName cannot be empty' })
    }
    if (!email) {
      return res.json({ statusCode: 400, data: 'Email field is required' })
    }
    if (!phone) {
      return res.json({ statusCode: 400, data: 'Phone field is required' })
    }
    if (!isValidPassword(password)) {
      //return res.json({ statusCode: 400, data: 'Password is invalid format' })
      return res.json({
        statusCode: 400,
        data:
          'Password must be at least 8 characters long, and contain at least one uppercase, lowercase, symbol and digit',
      })
    }
    if (!password || password === null) {
      return res.json({ statusCode: 400, data: 'Password cannot be empty' })
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.json({ statusCode: 400, data: 'Passwords do not match' })
    }

    const currentTimeInMilliseconds = new Date().getTime()
    const refcode = await generateRandomString(9)
    const hashedPassword = bcrypt.hashSync(password, 8)
    const otp =await generateOTP()
    // Prepare user data for registration.
    const payload = {
      firstName,
      lastName,
      hashedPassword,
      confirmPassword,
      status: true,
      verified: false,
      refcode,
      created_at: currentTimeInMilliseconds,
      email,
      phone,
      otp: otp,
    }

    // Check if the registration is by email or phone.

    // Check if the provided email is valid.
    if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email.trim())) {
      return res.status(400).json({ data: 'Email is invalid' })
    }

    // Register user by email using the Users model.
    Users.register(payload, (err, result) => {
      if (err) {
        if (err.type === 'user_exist') {
          return res.json({ statusCode: 302, data: 'User already exists' })
        } else {
          return res.json({ statusCode: 300, data: 'Server error' })
        }
      } else {
        if (result !== null) {
          try {
            sendEmailWeb(
              process.env.EMAIL_API_KEY,
              process.env.SENDER_ADDRESS,
              'Pharmplug',
              email,
              otp,
            )

            console.log(result)
            return res.json({ statusCode: 200, data: result.customercode })
          } catch (error) {
            console.log(error)
            return res.json({ statusCode: 300, data: 'Server error' })
          }
        }
      }
    })
  } catch (error) {
    // Handle any errors that occur during the registration process.
    console.log(error)
    return res.json({ statusCode: 500, data: 'Internal server error' })
  }
}

// Exporting a function named 'login' to handle user login.
exports.login = (req, res) => {
  try {
  

    // Destructure data and password from the request body.
    const { data, password } = req.body
console.log(req.body)
    // Check if 'data' is a numeric value (potentially a phone number).
   
   
     if (validator.isEmail(data)) {
      // If 'data' is not numeric and is a valid email, attempt login by email.
      Users.loginByEmail(data, password, (err, result) => {
        if (err) {
          console.log(err)
          if (err.type === 'no_user_found') {
            res.json({ statusCode: 404, data: 'User not found' })
          } else if (err.type === 'password_is_incorrect') {
            res.json({
              statusCode: 404,
              data: 'The password you entered is incorrect',
            })
          } else {
            res.json({ statusCode: 300, data: 'An error occurred. Try again.' })
          }
        } else {
          console.log(result)
          res.json({ statusCode: 200, data: result })
        }
      })
    }else{

      console.log(data)
         // Attempt to log in by phone using the Users model.
         Users.loginByPhone(data, password, (err, result) => {
          console.log(data)
          if (err) {
            console.log(err)
            if (err.type === 'no_user_found') {
              res.json({ statusCode: 404, data: 'User not found' })
            } else if (err.type === 'password_is_incorrect') {
              res.json({
                statusCode: 404,
                data: 'The password you entered is incorrect',
              })
            } else {
              res.json({ statusCode: 300, data: 'An error occurred. Try again.' })
            }
          } else {
            console.log(result)
            res.json({ statusCode: 200, data: result })
          }
        })
    }
  } catch (error) {
    // Handle any errors that occur during the login process.
    res.json({ statusCode: 500, data: error })
  }
}

// Exporting a function named 'deleteUser' to handle user deletion.
exports.deleteUser = (req, res) => {
  // Define an empty string to store validation errors.

  // Check if the request object is present (which indicates the request was received).
  if (req) {
    const { id } = req.body

    // Perform validation for the 'id' field.
    if (!id || typeof id !== 'string') {
      return res.json({
        statusCode: 400,
        data: 'Id is required and should be a string',
      })
    }

    try {
      // Attempt to delete the user using the Users model.
      Users.deleteAUser(id, (err, result) => {
        if (err) {
          if (err.type === 'No_user_found') {
            res.json({ data: 'That id does not exist' })
          } else {
            res.json({ data: 'An error occurred. Try again' })
          }
        } else {
          res.json({ data: result })
        }
      })
    } catch (error) {
      // Handle any errors that occur during the deletion process.
      res.json({ data: error })
    }
  }
}

exports.forgotPassword = (req, res) => {
  // Check if the request object is present (which indicates the request was received).
  if (req) {
    const { email, phone } = req.body

    if (!email) {
      return res.json({ statusCode: 400, data: 'Email field is required' })
    }
    if (!phone) {
      return res.json({ statusCode: 400, data: 'Phone field is required' })
    }

    // Check if the registration is by email or phone.
    if (email !== 'null') {
      // Check if the provided email is valid.
      if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email.trim())) {
        return res.status(400).json({ data: 'Email is invalid' })
      }

      // Register user by email using the Users model.
      Users.byEmail(email, (err, result) => {
        if (err) {
          if (err.type === 'no_user_found') {
            return res.json({ statusCode: 302, data: 'User does not exist' })
          } else {
            return res.json({ statusCode: 300, data: 'Server error' })
          }
        } else {
          if (result !== null) {
            console.log(result)
            return res.json({ statusCode: 200, data: result.customercode })
          }
        }
      })
    } else {
      // If the email is not provided, validate the phone number.
      if (validatePhoneNumber(phone)) {
        return res.json({ statusCode: 400, data: 'Phone is invalid' })
      }

      // Register user by phone using the Users model.
      Users.byPhone(phone, (err, result) => {
        if (err) {
          if (err.type === 'no_user_found') {
            return res.json({ statusCode: 302, data: 'User does not exist' })
          } else {
            return res.json({ statusCode: 300, data: 'Server error' })
          }
        } else {
          if (result !== null) {
            return res.json({ statusCode: 200, data: result.customercode })
          }
        }
      })
    }
  }
}

exports.resetPassword = (req, res) => {
  // Check if the request object is present (which indicates the request was received).
  if (req) {
    const { id, password } = req.body

    if (!id) {
      return res.json({ statusCode: 400, data: 'id field is required' })
    }
    if (!password) {
      return res.json({ statusCode: 400, data: 'Password field is required' })
    }
    //Encrypt password here
    const hashedPassword = bcrypt.hashSync(password, 8)
    // Register user by email using the Users model.
    Users.resetUserPassword(id, hashedPassword, (err, result) => {
      if (err) {
        if (err.type === 'no_user_found') {
          return res.json({ statusCode: 302, data: 'User does not exist' })
        } else {
          return res.json({ statusCode: 300, data: 'Server error' })
        }
      } else {
        if (result !== null) {
          return res.json({ statusCode: 200, data: 'success' })
        }
      }
    })
  }
}

exports.verifyAccount = (req, res) => {
  // Check if the request object is present (which indicates the request was received).
  if (req) {
    const { id, otpData } = req.body
    if (!id) {
      return res.json({ statusCode: 400, data: 'id field is required' })
    }
    if (!otpData) {
      return res.json({ statusCode: 400, data: 'OTP field is required' })
    }
    if (parseInt( otpData)===1111) {
      return res.json({ statusCode: 400, data: 'Forbidden OTP code' })
    }
    // Register user by email using the Users model.
    Users.otp(id, otpData, (err, result) => {
      if (err) {
         
        if (err.type === 'Invalid otp sent') {
          return res.json({ statusCode: 302, data: 'Invalid OTP Code' })
        }
        if (err.type === 'no_user_found') {
          return res.json({ statusCode: 302, data: 'User does not exist' })
        } else {
          return res.json({ statusCode: 300, data: 'Server error' })
        }
      } else {
        if (result !== null) {
          return res.json({ statusCode: 200, data: 'success' })
        }
      }
    })
  }
}
