const https = require('https')
const dotenv = require('dotenv')
const crypto = require('crypto')
const COMMON_CONFIG = require('../config/common')
dotenv.config()

const axios = require('axios')
const Payment = require('../models/paymentModel')

exports.verifyPayment = async (req, res) => {
  try {
    const url = `${COMMON_CONFIG.NETWORK_CONFIG.PAYSTACK_URL}/transaction/verify/${req.query.reference}`
    const authorization = `Bearer ${COMMON_CONFIG.SECURITY_KEY.PAYSTACK_SECRET}`

    const response = await axios.get(url, {
      headers: {
        Authorization: authorization,
      },
    })

    const data = response.data
    console.log(data) // Print the response data

    // You can handle success here, e.g., sending response to client
    res.status(200).json(data)
    if (data['message'] === 'Verification successful') {
      try {
        const payload = {
          status: data.data.status?.toString() || '',
          reference: data.data.reference?.toString() || '',
          receipt_number: data.data.receipt_number?.toString() || '',
          amount: data.data.amount?.toString() || '',
          message: data.data.message?.toString() || '',
          gateway_response: data.data.gateway_response?.toString() || '',
          paid_at: data.data.paid_at?.toString() || '',
          created_at: data.data.created_at?.toString() || '',
          currency: data.data.currency?.toString() || '',
          ip_address: data.data.ip_address?.toString() || '',
          log: data.data.log?.toString() || '',
          fees: data.data.fees?.toString() || '',
          paidAt: data.data.paidAt?.toString() || '',
          requested_amount: data.data.requested_amount?.toString() || '',
          transaction_date: data.data.transaction_date?.toString() || '',
          customercode: data.data.metadata?.customercode?.toString() || '',
        }
        Payment.savePayments(payload, async (err, result) => {
          console.log(err, result)
        })
      } catch (error) {
        console.log(error)
      }
    }
  } catch (error) {
    console.error('Error:', error)
    // Handle the error, e.g., sending error response to client
    res
      .status(500)
      .json({ error: 'An error occurred while verifying payment.' })
  }
}

exports.initializePayments = (req, res) => {
  try {
    // Check if required fields are present in the request body
    if (!req.body.email || !req.body.amount || !req.body.id) {
      return res
        .status(400)
        .json({ error: 'Missing required fields in the request body.' })
    }

    const url = `${COMMON_CONFIG.NETWORK_CONFIG.PAYSTACK_URL}/transaction/initialize`
    const authorization = `Bearer ${COMMON_CONFIG.SECURITY_KEY.PAYSTACK_SECRET}`
    const contentType = 'application/json'

    const data = {
      email: req.body.email,
      amount: req.body.amount,
      metadata: {
        customercode: req.body.id,
      },
    }

    axios
      .post(url, data, {
        headers: {
          Authorization: authorization,
          'Content-Type': contentType,
        },
      })
      .then((response) => {
        console.log(response.data) // Print the response data
        res.status(200).json(response.data) // Send response to client
      })
      .catch((error) => {
        console.error('Error:', error)
        res
          .status(500)
          .json({ error: 'An error occurred while initializing payment.' }) // Send error response to client
      })
  } catch (error) {
    console.error('Error:', error)
    res.status(400).json({ error: 'Bad request.' }) // Handle general request error
  }
}

exports.payentWebhook = (req, res) => {
  try {
    //validate event
    const hash = crypto
      .createHmac('sha512', COMMON_CONFIG.SECURITY_KEY.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex')
    if (hash == req.headers['x-paystack-signature']) {
      // Retrieve the request's body
      const event = req.body
      // Do something with event
    }
    res.send(200)
  } catch (error) {}
}
exports.getAllPayments = (req, res) => {
  try {
    // Get all requests
    Payment.getAll((err, result) => {
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
        const paymentArray = result.map((item) => ({
          id: item.id,

          status: item.status,
          reference: item.reference,
          receipt_number: item.receipt_number,
          amount: item.amount,
          message: item.message,
          gateway_response: item.gateway_response,
          paid_at: item.paid_at,
          created_at: item.created_at,
          channel: item.channel,
          currency: item.currency,
          ip_address: item.ip_address,
          log: item.log,
          fees: item.fees,
          requested_amount: item.requested_amount,
          transaction_date: item.transaction_date,
          customercode: item.customercode,
          paidat: item.paidat,
        }))
        res.json({ statusCode: 200, data: paymentArray })
      }
    })
  } catch (error) {
    res.json({ statusCode: 500, message: 'Internal server error' })
  }
}
exports.aUserPayment = (req, res) => {
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
      Payment.aUserPayment(customerCode, (err, result) => {
        if (err) {
          if (err.type == 'no_payments') {
            return res.json({ statusCode: 404, data: 'User has no payments' })
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
