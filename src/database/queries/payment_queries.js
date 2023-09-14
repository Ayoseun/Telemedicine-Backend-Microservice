const insertPayment = `INSERT INTO payments (id,
    status,
    reference,
    receipt_number,
   amount,
    message,
    gateway_response,
    paid_at,
    created_at,
    channel,
   currency,
    ip_address,
  
    log,
    fees,
    requested_amount,
    transaction_date, customercode,paidat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING *;`

const getLastIndex = `SELECT max(id) FROM payments;`

const getUserPayment = `SELECT * FROM payments WHERE customercode = $1`
const getAllPayments = `SELECT * FROM payments`

module.exports = {
  insertPayment,
  getAllPayments,
  getLastIndex,
  getUserPayment,
}
