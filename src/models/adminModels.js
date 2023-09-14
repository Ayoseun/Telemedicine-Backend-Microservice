const pool = require('../connections/connection.init')
const {
  getAllAdmins,
  updateAdmin,
  getLastIndex,
  insertAdmin,
  checkEmailQuery,
  deleteAdmin,
  getAdmin,
} = require('../database/queries/admin_queries')

class Admin {
  constructor(fullname, email, password, role, created_at, status) {
    ;(this.fullname = fullname),
      (this.email = email),
      (this.password = password),
      (this.role = role),
      (this.status = status),
      (this.created_at = created_at)
  }

  static getAll(cb) {


      pool.query(getAllAdmins, (err, res) => {
      
        if (err) {
          console.log(err.message)
          cb(err, null)
          return
        }

        if (res.rows.length === 0) {
          console.log('No admin found')
          cb({ type: 'no_admin' }, null)
        } else {
          console.log('Available admin', res.rows)
          cb(null, res.rows)
        }
      })
    
  }

  // static create method to insert a new admin record
  static create(newAdmin, cb) {
    try {
   

        pool.query(checkEmailQuery, [newAdmin.email], (err, res) => {
          if (err) {
           
            console.log(err)
            cb(err, null)
            return
          }

          if (res.rows.length > 0) {
      
            cb({ type: 'user_exist' }, null)
            return
          }

          // Continue with the process to insert the new admin record
          pool.query(getLastIndex, (err, res) => {
           
            if (err) {
              console.log(err)
              cb(err, null)
              return
            }

            const latestId = res.rows[0].max
            const newId = latestId !== null ? parseInt(latestId) + 1 : 1

            pool.query(
              insertAdmin,
              [
                newId,
                newAdmin.email,
                newAdmin.password,
                newAdmin.role,
                newAdmin.status,
                newAdmin.created_at,
                newAdmin.name,
                newAdmin.surname,
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

  static getOneAdmin(email, password, cb) {
    try {
   

        pool.query(getAdmin, [email, password], (err, res) => {
          if (err) {
           
            console.log(err)
            cb(err, null)
            return
          }

          if (res.rows.length === 0) {
           
            cb({ type: 'no_admin_found' }, null)
            return
          } else {
            cb(null, res.rows[0])
          }
        })
    
    } catch (error) {
      cb(error, null)
    }
  }

  static updateStatus(updateData, cb) {
    try {
   
        pool.query(
          updateAdmin,
          [
            updateData.id,
            updateData.name,
            updateData.surname,
            updateData.password,
            updateData.status,
            updateData.role,
            updateData.created_at,
          ],
          (err, res) => {
            
            if (err) {
              console.log(err.message)
              cb(err, null)
            } else {
              console.log('Update is successful')
              cb(null, res.rows[0])
            }
          },
        )
      
    } catch (error) {}
  }

  static deleteAdmin(id, cb) {
    try {
   
        pool.query(deleteAdmin, [id], (err, res) => {
 
          if (err) {
            console.log(err)
            cb(err, null)
          }
          if (res.rows.length === 0) {
            cb({ type: 'No_admin_found' }, null)
            return
          } else {
            cb(null, res.rows[0])
          }
        })
      
    } catch (error) {}
  }
}

module.exports = Admin
