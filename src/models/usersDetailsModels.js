const client = require('../connections/connection.init');
const { addUsersDetails, getUsersDetails } = require('../database/queries/user')

class UsersDetails {
    constructor(name, email, phone, image) {
        this.name = name,
        this.email = email,
        this.phone = phone,
        this.image = image
    }

    static addUsersDetails(newDetails, cb) {
        client.query(addUsersDetails, [newDetails.name, newDetails.email, newDetails.phone, newDetails.image] ,(err, res) => {
            if (err) {
                console.log(err)
                cb(err, null)
                return
            }
            const userDetails = {
                id : res.rows[0].id,
                name : newDetails.name,
                email : newDetails.email,
                phone : newDetails.phone,
                image : newDetails.image
            }
            console.log('User detail successfully added', userDetails)
            cb(null, userDetails)
        })
    }

    static getUsersDetails(cb) {
        client.query(getUsersDetails, (err, res) => {
            if (err) {
                console.log(err.message)
                cb(err, null)
                return
            }else if (res.rows.length == 0) {
                console.log("No users details to show at the moment")
                cb({type : "no_details"}, null)
                return
            }else {
                console.log("Available users details", res.rows)
                cb(null, res.rows)
            }
        })
    }

}

module.exports = UsersDetails