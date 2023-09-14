const client = require('../connections/connection.init');
const { addHistory, getAllHistories, getOneHistory } = require('../database/queries/user')

class UsersHistory {
    constructor(productImage, productName, productPrice, location) {
        this.productImage = productImage,
        this.productName = productName,
        this.productPrice = productPrice,
        this.location = location
    }

    static addHistory(newHistory, cb) {
        client.query(addHistory, [newHistory.productImage, newHistory.productName, newHistory.productPrice, newHistory.location] ,(err, res) => {
            if (err) {
                console.log(err)
                cb(err, null)
                return
            }
            const userHistory = {
                id : res.rows[0].id,
                productImage : newHistory.productImage,
                productName : newHistory.productName,
                productPrice : newHistory.productPrice,
                location : newHistory.location
            }
            console.log('History successfully created', userHistory)
            cb(null, userHistory)
        })
    }

    static getAllHistories(cb) {
        client.query(getAllHistories, (err, res) => {
            if (err) {
                console.log(err.message)
                cb(err, null)
                return
            }else if (res.rows.length == 0) {
                console.log("No history at the moment")
                cb({type : "no_history"}, null)
                return
            }else {
                console.log("Available users histories", res.rows)
                cb(null, res.rows)
            }
        })
    }

    static getOneHistory(productName, cb) {
        client.query(getOneHistory, [productName], (err, res) => {
            if (err) {
                console.log(err.message)
                cb(err, null)
                return
            }else if (res.rows.length == 0) {
                console.log("That user history does not exist")
                cb({type : "no_history"}, null)
                return
            }else {
                console.log("User history", res.rows)
                cb(null, res.rows)
            }
        })
    }

}

module.exports = UsersHistory