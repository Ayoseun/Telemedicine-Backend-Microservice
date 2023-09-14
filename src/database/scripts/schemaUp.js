const client = require('../../connections/connection.init');
const { createSchema } = require('../queries');

(() => {
    client.query(createSchema, (err, _) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('Schema successfully created')
    }) 
})()