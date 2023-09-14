const pool = require('../connections/connection.init')

const {
  getAllCoverages, checkCoverageQuery, insertCoverage, getLastIndex, getByCity, getByState,

} = require('../database/queries/coverage_queries')

class Coverage {
  static getAll(cb) {
    pool.connect((err, client, done) => {
      if (err) {
        console.log(err.message)
        cb(err, null)
        client.release(); // Release connection
        return
      }

      client.query(getAllCoverages, (err, res) => {
        client.release(); // Release connection
        if (err) {
          console.log(err.message)
          cb(err, null)
          return
        }
        if (res.rows.length === 0) {
          console.log('No State found')
          cb({ type: 'no_state_found' }, null)
        } else {
          console.log('Available states', res.rows)
          cb(null, res.rows)
        }
      })
    })
  }

  // static create method to insert a new Data record
  static create(newData, cb) {
    try {
      pool.connect((err, client, done) => {
        if (err) {
          console.log(err.message)
          cb(err, null)
          client.release(); // Release connection
          return
        }

        client.query(checkCoverageQuery, [newData.city], (err, res) => {
          if (err) {
            client.release(); // Release connection
            console.log(err)
            cb(err, null)
            return
          }

          if (res.rows.length > 0) {
            client.release(); // Release connection
            cb({ type: 'location_exist' }, null)
            return
          }

          // Continue with the process to insert the new Data record
          client.query(getLastIndex, (err, res) => {
           
            if (err) {
              console.log(err)
              cb(err, null)
              return
            }

            const latestId = res.rows[0].max
            const newId = latestId !== null ? parseInt(latestId) + 1 : 1

            client.query(
              insertCoverage,
              [
                newId,
                newData.isactive,
                newData.created_at,
                newData.state.toLowerCase(),
                newData.city.toLowerCase(),
              ],
              (err, res) => {
                if (err) {
                  console.log(err)
                  cb(err, null)
                  return
                }

                cb(null, res.rows[0])
              },
            )
          })
        })
      })
    } catch (error) {
      cb(error, null)
    }
  }

  static getLocationByCity(city, cb) {
    try {
      pool.connect((err, client, done) => {
        if (err) {
          console.log(err.message)
          cb(err, null)
          client.release(); // Release connection
          return
        }

        client.query(getByCity, [city], (err, res) => {
          if (err) {
          
            console.log(err)
            cb(err, null)
            return
          }

          if (res.rows.length === 0) {
           
            cb({ type: 'no_city_found' }, null)
            return
          } else {
            console.log(res.rows[0])
            cb(null, res.rows[0])
          }
        })
      })
    } catch (error) {
      cb(error, null)
    }
  }


  static getLocationByState(state, cb) {
    try {
      pool.connect((err, client, done) => {
        if (err) {
          console.log(err.message)
          cb(err, null)
          client.release(); // Release connection
          return
        }

        client.query(getByState, [state], (err, res) => {
          if (err) {
            client.release(); // Release connection
            console.log(err)
            cb(err, null)
            return
          }

          if (res.rows.length === 0) {
            client.release(); // Release connection
            cb({ type: 'no_state_found' }, null)
            return
          } else {
            cb(null, res.rows)
          }
        })
      })
    } catch (error) {
      cb(error, null)
    }
  }
}
module.exports = Coverage