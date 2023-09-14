const insertPharmacy = `INSERT INTO pharmacies (id, name, address, city,state,status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`

const updatePharmacy = `UPDATE pharmacies SET name=$2, address = $3,city = $4,state = $5,status=$6, created_at=$7 WHERE id = $1 RETURNING *`

const deletePharmacy = `DELETE FROM pharmacies WHERE id = $1 RETURNING *`

const getAllPharmacy = `SELECT * FROM pharmacies`

const checkNameQuery = `SELECT id FROM pharmacies WHERE name = $1`
const getByState = `SELECT * FROM pharmacies WHERE state = $1`
const getByCity = `SELECT * FROM pharmacies WHERE city = $1`

const getLastIndex = `SELECT max(id) FROM pharmacies;`

module.exports = {
  insertPharmacy,
  updatePharmacy,
  deletePharmacy,
  getAllPharmacy,
  getLastIndex,
  checkNameQuery,
  getByCity,getByState
}
