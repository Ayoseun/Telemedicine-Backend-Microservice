const pool = require('../connections/connection.init')
const {
  getAllPayments,
  getLastIndex,
  insertPayment,
  getUserPayment,
} = require('../database/queries/payment_queries')

class Payment {
  static getAll(cb) {
    pool.connect((err, client, done) => {
      if (err) {
        console.log(err.message)
        cb(err, null)
        client.release(); // Release connection
        return
      }

      client.query(getAllPayments, (err, res) => {
        client.release(); // Release connection
        if (err) {
          console.log(err.message)
          cb(err, null)
          return
        }
        if (res.rows.length === 0) {
          console.log('No payment at the moment')
          cb({ type: 'no_payment' }, null)
        } else {
          console.log('Available payments', res.rows)
          cb(null, res.rows)
        }
      })
    })
  }

  static savePayments(newPayment, cb) {
    try {
      pool.connect((err, client, done) => {
        if (err) {
          console.log(err.message)
          cb(err, null)
          client.release(); // Release connection
          return
        }

        // First, retrieve the maximum ID value from the database
        client.query(getLastIndex, (err, res) => {
          client.release(); // Release connection
          if (err) {
            console.log(err)
            cb(err, null)
            return
          }

          // Get the maximum ID value from the result
          const latestId = res.rows[0].max

          // Calculate the new ID by incrementing the latest ID value
          const newId = latestId !== null ? latestId + 1 : 1

          // Now, insert the new request with the auto-incremented ID
          client.query(
            insertPayment,
            [
              newId,
              newPayment.status,
              newPayment.reference,
              newPayment.receipt_number,
              newPayment.amount,
              newPayment.message,
              newPayment.gateway_response,
              newPayment.paid_at,
              newPayment.created_at,
              newPayment.channel,
              newPayment.currency,
              newPayment.ip_address,           
              newPayment.log,
              newPayment.fees,
             
              newPayment.requested_amount,
              newPayment.transaction_date, newPayment.customercode, newPayment.paidAt
            ],
            (err, res) => {
             
              if (err) {
                console.log(err)
                cb(err, null)
                return
              }
              //console.log('Payment created successfully', res["rows"][0]);
              cb(null, res['rows'][0])
            },
          )
        })
      })
    } catch (error) {
      cb(err, null)
    }
  }


  static getAUserPayment(customerCode, cb) {

    try {
      pool.connect((err, client, done) => {
        if (err) {
          console.log(err.message)
          cb(err, null)
          client.release(); // Release connection
          return
        }

      
          client.query(getUserPayment, [customerCode], (err, res) => {
          if (err) {
            client.release(); // Release connection
            console.log(err)
            cb(err, null)
            return
          }

          if (res.rows.length === 0) {
            console.log('No payments at the moment')
            cb({ type: 'no_payments' }, null)
          } else {
            console.log('Available payments', res.rows)
           
            cb(null, res.rows)
          }
        })
      })
    } catch (error) {
      cb(error, null)
    }
  }
}
module.exports = Payment