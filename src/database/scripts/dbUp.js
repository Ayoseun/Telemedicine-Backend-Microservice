const client = require('../../connections/connection');
const { createDB } = require('../queries');

(() => {
    client.query(createDB, (err, _) => {
        if (err) {
            console.log(err)
            return
        }else {
            console.log('Database successfully created')
        }
    }) 
})()