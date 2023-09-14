

const insertCoverage = `INSERT INTO coverage (id,isactive,created_at,state,city) VALUES ($1, $2, $3, $4,$5) RETURNING *;`
const updateCoverage = `UPDATE coverage SET isactive = $1 WHERE id = $2 RETURNING *`
const deleteCoverage = `DELETE FROM coverage WHERE id = $1 RETURNING *`;
const getLastIndex=`SELECT max(id) FROM coverage;`
const getAllCoverages = `SELECT * FROM coverage`
const checkCoverageQuery = `SELECT id FROM coverage WHERE city= $1`;
const getByState = `SELECT * FROM coverage WHERE state = $1`
const getByCity = `SELECT * FROM coverage WHERE city = $1`

module.exports={
insertCoverage,updateCoverage,getAllCoverages,getLastIndex,deleteCoverage,checkCoverageQuery,getByCity,getByState
}

