const insertAdmin = `INSERT INTO admin (id,email, password, role, status, created_at,name,surname) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *;`;

const updateAdmin = `UPDATE admin SET name = $2,surname = $3, password = $4,status = $5, role = $6, created_at = $7 WHERE id = $1 RETURNING *`;

const deleteAdmin = `DELETE FROM admin WHERE id = $1 RETURNING *`;

const getAllAdmins = `SELECT * FROM admin`;

const checkEmailQuery = `SELECT id FROM admin WHERE email = $1`;
const getAdmin = `SELECT * FROM admin WHERE email = $1 AND password = $2`;

const getLastIndex = `SELECT max(id) FROM admin;`;

module.exports = {
  insertAdmin,
  checkEmailQuery,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdmin,
  getLastIndex,
};
