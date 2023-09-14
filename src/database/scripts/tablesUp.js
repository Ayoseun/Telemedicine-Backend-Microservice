const client = require('../../connections/connection.init');
const { createTable } = require('../queries');

(() => {
    client.query(createTable, (err, _) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('Table successfully created')
    }) 
})()