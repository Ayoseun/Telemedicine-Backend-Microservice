const pool = require('../connections/connection.init')
const {
  getAllRequests,
  updateRequest,
  getLastIndex,
  insertRequest,
  getUserRequests,
} = require('../database/queries/request_queries')

class Requests {
  constructor(
    customername,
    phone,
    customerlocation,
    deliverytype,
    status,
    created_at,
    ref,
    items,
  ) {
    ;(this.customername = customername),
      (this.phone = phone),
      (this.customerlocation = customerlocation),
      (this.deliverytype = deliverytype),
      (this.status = status),
      (this.created_at = created_at),
      (this.ref = ref),
      (this.items = items),
      (this.price = price)
  }

  static getAll(cb) {
    pool.query(getAllRequests, (err, res) => {
      if (err) {
        console.log(err.message)
        cb(err, null)
        return
      }

      if (res.rows.length === 0) {
        console.log('No request at the moment')
        cb({ type: 'no_request' }, null)
      } else {
        console.log('Available request', res.rows)

        cb(null, res.rows)
      }
    })
  }

  static create(newRequest, cb) {
    try {
      // First, retrieve the maximum ID value from the database
      pool.query(getLastIndex, (err, res) => {
        if (err) {
          console.log(err)
          cb(err, null)
          return
        }

        // Get the maximum ID value from the result
        const latestId = res.rows[0].max

        // Calculate the new ID by incrementing the latest ID value
        const newId = latestId !== null ? parseInt(latestId) + 1 : 1

        // Now, insert the new request with the auto-incremented ID
        pool.query(
          insertRequest,
          [
            newId,
            newRequest.phone,
            newRequest.customerlocation,
            newRequest.deliverytype,
            newRequest.status,
            newRequest.created_at,
            newRequest.ref,
            newRequest.items,
            newRequest.price,
            newRequest.customercode,
            newRequest.state,
            newRequest.city,
            newRequest.pickuplocation,
            newRequest.name,
            newRequest.surname,
          ],
          (err, res) => {
            if (err) {
              console.log(err)
              cb(err, null)
              return
            }

            //console.log('Request created successfully', res["rows"][0]);
            cb(null, res['rows'][0])
          },
        )
      })
    } catch (error) {
      cb(err, null)
    }
  }

  static updateStatus(id, status, cb) {
    try {
      pool.query(updateRequest, [status, id], (err, res) => {
        if (err) {
          console.log(err.message)
          cb(err, null)
        } else {
          console.log('Update is successful')
          cb(null, res.rows[0])
        }
      })
    } catch (error) {}
  }

  static getAUserRequest(customerCode, cb) {
    try {
      pool.query(getUserRequests, [customerCode], (err, res) => {
        if (err) {
                   console.log(err)
          cb(err, null)
          return
        }

        if (res.rows.length === 0) {
          console.log('No request at the moment')
          cb({ type: 'no_request' }, null)
        } else {
          console.log('Available request', res.rows)

          cb(null, res.rows)
        }
      })
    } catch (error) {
      cb(error, null)
    }
  }
}

module.exports = Requests
