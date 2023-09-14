

const insertRequest = `INSERT INTO requests (id, phone, customerlocation, deliverytype, status,created_at,ref,items,price,customercode,state,city,pickuplocation,name,surname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13,$14,$15) RETURNING *;`

const updateRequest = `UPDATE requests SET status = $1 WHERE id = $2 RETURNING *`

const getLastIndex=`SELECT max(id) FROM requests;`

const getUserRequests = `SELECT * FROM requests WHERE customercode = $1`;
const getAllRequests = `SELECT * FROM requests`

module.exports={
insertRequest,updateRequest,getAllRequests,getLastIndex,getUserRequests
}