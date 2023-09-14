

const insertUser = `INSERT INTO users (id,password,created_at,verified,status,refcode,name,surname,email,phone,customercode,otp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12) RETURNING *;`
const updateUserPassword = `UPDATE users SET password = $2 WHERE customercode = $1 RETURNING *`
const updateUserOTP = `UPDATE users SET otp = $2, verified = $3 WHERE customercode = $1 RETURNING *`
const deleteUser = `DELETE FROM users WHERE customercode = $1 RETURNING *`;
const getLastIndex=`SELECT max(id) FROM users;`
const referralCodecheck = `SELECT FROM users WHERE refcode = $1 RETURNING *`;
const getAllUsers = `SELECT * FROM users`
const checkEmailQuery = `SELECT customercode FROM users WHERE email= $1`;
const getByUserOTP=`SELECT otp FROM users WHERE customercode= $1`;
const checkPhoneQuery = `SELECT customercode FROM users WHERE phone= $1`;
const getUserByEmailForLogin = `SELECT * FROM users WHERE email = $1`;
const getUserByPhoneForLogin = `SELECT * FROM users WHERE phone = $1`;

module.exports={
insertUser,updateUserPassword,getAllUsers,getLastIndex,getByUserOTP, deleteUser,referralCodecheck,getUserByEmailForLogin,getUserByPhoneForLogin,checkEmailQuery,checkPhoneQuery,updateUserOTP
}


