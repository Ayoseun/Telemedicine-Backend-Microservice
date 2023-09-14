const pool = require('../connections/connection.init')

const {
  getAllPharmacy,
  checkNameQuery,
  getLastIndex,
  insertPharmacy,
  getByCity,
  getByState,
} = require('../database/queries/pharmacies_queries')

class Pharmacies {
  static getAll(cb) {


      pool.query(getAllPharmacy, (err, res) => {
    
        if (err) {
          console.log(err.message)
          cb(err, null)
          return
        }
        if (res.rows.length === 0) {
          console.log('No pharmacy found')
          cb({ type: 'no_pharmacy' }, null)
        } else {
          console.log('Available pharmacy', res.rows)
          cb(null, res.rows)
        }
      })
    
  }

  // static create method to insert a new Pharm record
  static create(newPharm, cb) {
    try {


        pool.query(checkNameQuery, [newPharm.name], (err, res) => {
          if (err) {
           
            console.log(err)
            cb(err, null)
            return
          }

          if (res.rows.length > 0) {
          
            cb({ type: 'pharmacy_exist' }, null)
            return
          }

          // Continue with the process to insert the new Pharm record
          pool.query(getLastIndex, (err, res) => {
      
            if (err) {
              console.log(err)
              cb(err, null)
              return
            }

            const latestId = res.rows[0].max
            const newId = latestId !== null ? parseInt(latestId) + 1 : 1

            pool.query(
              insertPharmacy,
              [
                newId,
                newPharm.name.toLowerCase(),
                newPharm.address.toLowerCase(),
                newPharm.city.toLowerCase(),
                newPharm.state.toLowerCase(),
                newPharm.status.toLowerCase(),
                newPharm.created_at.toLowerCase(),
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
      
    } catch (error) {
      cb(error, null)
    }
  }

  static getPharmByCity(city, cb) {
    try {


        pool.query(getByCity, [city], (err, res) => {
          if (err) {
          
            console.log(err)
            cb(err, null)
            return
          }

          if (res.rows.length === 0) {
         
            cb({ type: 'no_city_found' }, null)
            return
          } else {
            console.log(res.rows)
            cb(null, res.rows)
          }
        })
      
    } catch (error) {
      cb(error, null)
    }
  }


  static getPharmByState(state, cb) {
    try {


        pool.query(getByState, [state], (err, res) => {
          if (err) {
           
            console.log(err)
            cb(err, null)
            return
          }

          if (res.rows.length === 0) {
          
            cb({ type: 'no_state_found' }, null)
            return
          } else {
            cb(null, res.rows)
          }
        })
      
    } catch (error) {
      cb(error, null)
    }
  }
}
module.exports = Pharmacies
