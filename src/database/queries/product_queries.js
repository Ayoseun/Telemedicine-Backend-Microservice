const addProduct = `INSERT INTO products (id,imageurl, category, price, productname, packsize, dosageform, companyname, productcode,created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10) RETURNING *`
const updateOneProduct = `UPDATE products SET imageurl= $1, category = $2, price = $3,productname = $4, packsize = $5, dosageform = $6, companyname = $7,productcode = $8 WHERE id = $9 RETURNING *`

const getAllProducts = `SELECT * FROM products OFFSET $1 LIMIT $2`

const getAllProductsWithoutLimit = `SELECT * FROM products`

const getProductsByName = `SELECT * FROM products WHERE productname LIKE $1`

const getProductsByCategory = `SELECT * FROM products WHERE category LIKE $1`

const getProductById = `SELECT * FROM products WHERE id = $1`

const getProductByProductcode = `SELECT * FROM products WHERE productcode = $1`
const isDoubleEntry = `SELECT * FROM products WHERE productname = $1 AND companyname = $2`
const getProductsDistinctDosageForms = `SELECT DISTINCT(dosageform) FROM products`
//const getProductsDistinctDosageForms = `SELECT dosageform FROM products GROUP BY dosageform`

const getProductsCategories = `SELECT DISTINCT(category) FROM products`
const getLastIndex = `SELECT max(id) FROM products;`

module.exports = {
  addProduct,
  updateOneProduct,
  getAllProducts,
  getProductById,
  getProductByProductcode,
  getProductsByCategory,
  getProductsDistinctDosageForms,
  getProductsByName,
  getProductsCategories,
  getAllProductsWithoutLimit,
  getLastIndex,
  isDoubleEntry,
}
