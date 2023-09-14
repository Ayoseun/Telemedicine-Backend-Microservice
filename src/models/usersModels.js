const pool = require('../connections/connection.init')
const {
  getAllUsers,
  deleteUser,
  insertUser,
  getLastIndex,
  getUserByEmailForLogin,
  getUserByPhoneForLogin,
  checkEmailQuery,
  checkPhoneQuery,
  updateUserPassword,
  updateUserOTP,
  getByUserOTP,
} = require('../database/queries/users_queries')
const bcrypt = require('bcryptjs')

class Users {
  static getAllUsers(cb) {
 
      //console.log(`Connected successfully!`)
      pool.query(getAllUsers, (err, res) => {
       
        if (err) {
          console.log(err.message)
          cb(err, null)
          return
        }

        if (res.rows.length === 0) {
          console.log('No users found')
          cb({ type: 'no_users_found' }, null)
        } else {
          console.log('All Users', res.rows)
          cb(null, res.rows)
        }
      })
    
  }


  

  static deleteAUser(id, cb) {
    try {
  
        pool.query(deleteUser, [id], (err, res) => {
         
          if (err) {
            console.log(err)
            cb(err, null)
          }
          if (res.rows.length === 0) {
            cb({ type: 'No_user_found' }, null)
            return
          } else {
            cb(null, res.rows[0])
          }
        })
      
    } catch (error) {}
  }



  static loginByEmail(email, password, cb) {
    console.log(`${email} , ${password}`)
    try {


        //pool.query(getUserByEmail, [email, password], (err, res) => {
          pool.query(getUserByEmailForLogin, [email], (err, res) => {
          if (err) {
         
            console.log(err)
            cb(err, null)
            return
          }

          if (res.rows.length === 0) {
           
            cb({ type: 'no_user_found' }, null)
            return
          } else {
            // Decrypt password and compare
            if (bcrypt.compareSync(password, res.rows[0].password) === false) {
             
              cb({ type: 'password_is_incorrect' }, null)
              return
            }
            cb(null, res.rows[0])
          }
        })
      
    } catch (error) {
      cb(error, null)
    }
  }



  static loginByPhone(phone, password, cb) {
    console.log(`user's phone: ${phone} , ${password}`)
    try {


        //pool.query(getUserByPhone, [phone, password], (err, res) => {
          pool.query(getUserByPhoneForLogin, [phone], (err, res) => {
          if (err) {
           
            console.log(err)
            cb(err, null)
            return
          }console.log(res.rows[0])
          if (res.rows.length === 0) {
           
            cb({ type: 'no_user_found' }, null)
            return
          } else {
            // Decrypt password and compare
            if (bcrypt.compareSync(password, res.rows[0].password) === false) {
             
              cb({ type: 'password_is_incorrect' }, null)
              return
            }
            cb(null, res.rows[0])
          }
        
      })
    } catch (error) {
      cb(error, null)
    }
  }



  // static create method to insert a new User record
  static register(newUser, cb) {
    try {
        pool.query(checkEmailQuery, [newUser.email], (err, res) => {
          if (err) {
           
            console.log(err)
            cb(err, null)
            return
          }

          if (res.rows.length > 0) {
           
            cb({ type: 'user_exist' }, null)
            return
          }

          // Continue with the process to insert the new User record
          pool.query(getLastIndex, (err, res) => {
           
            if (err) {
              console.log(err)
              cb(err, null)
              return
            }

            const latestId = res.rows[0].max
            const newId = latestId !== null ? parseInt(latestId) + 1 : 1
            const customercode = `pHmpl${newUser.refcode}${newId}`
            console.log(newUser)
            pool.query(
              insertUser,
              [
                newId,
                newUser.hashedPassword,
                newUser.created_at,
                newUser.verified,
                newUser.status,
                newUser.refcode,
                newUser.firstName,
                newUser.lastName,
                newUser.email,
                newUser.phone,
                customercode,
                newUser.otp

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



  //get user forgot password
  static byEmail(email, cb) {
    console.log(email)
    try {
        pool.query(checkEmailQuery, [email], (err, res) => {
          if (err) {
           
            console.log(err)
            cb(err, null)
            return
          }
          if (res.rows.length === 0) {
           
            cb({ type: 'no_user_found' }, null)
            return
          } else {
            cb(null, res.rows[0])
          }
        })
      
    } catch (error) {
      cb(error, null)
    }
  }



  //
  static resetUserPassword(id, password, cb) {
    console.log(`${id} , ${password}`)
    try {

        pool.query(updateUserPassword, [id,password], (err, res) => {
          if (err) {
           
            console.log(err)
            cb(err, null)
            return
          }
   
          if (res.rows.length === 0) {
           
            cb({ type: 'no_user_found' }, null)
            return
          } else {
            cb(null, res.rows[0])
          }
        })
      
    } catch (error) {
      cb(error, null)
    }
  }


    //
    static otp(id, otp, cb) {
      console.log(`${id} , ${otp}`)
      try {

          pool.query(getByUserOTP, [id], (err, res) => {
            if (err) {
             
              console.log(err)
              cb(err, null)
              return
            }
            if (res.rows.length === 0) {
             
              cb({ type: 'no_user_found' }, null)
              return
            } 
            if (res.rows[0].otp!==otp) {
             
              cb({ type: 'Invalid otp sent' }, null)
              return
            } 
            const newOTP = 1111;
          pool.query(updateUserOTP, [id,newOTP,true], (err, res) => {
            if (err) {
             
              console.log(err)
              cb(err, null)
              return
            }
     
            if (res.rows.length === 0) {
             
              cb({ type: 'no_user_found' }, null)
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
}

module.exports = Users
