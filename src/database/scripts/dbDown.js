const client = require('../../connections/connection');
const { dropDB } = require('../queries');

(() => {
    client.query(dropDB, (err, _) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('Database successful dropped')
    }) 
})()