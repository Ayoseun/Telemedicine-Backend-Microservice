const pool = require('../connections/connection.init')
const { checkAndReplaceNull } = require('../utils/null_converter')
const {
  addProduct,
  updateOneProduct,
  getAllProducts,
  getProductsByName,
  getProductsByCategory,
  getProductById,
  getProductByProductcode,
  getProductsDistinctDosageForms,
  getProductsCategories,
  getAllProductsWithoutLimit,
  getLastIndex,
  isDoubleEntry,
} = require('../database/queries/product_queries')

class Product {
  constructor(
    imageurl,
    category,
    price,
    productname,
    packsize,
    dosageform,
    companyname,
    productcode,
    id,
  ) {
    ;(this.imageurl = imageurl),
      (this.category = category),
      (this.price = price),
      (this.productname = productname),
      (this.packsize = packsize),
      (this.dosageform = dosageform),
      (this.companyname = companyname),
      (this.productcode = productcode),
      (this.id = id)
  }

  static addProduct(newProduct, cb) {
    pool.query(
      isDoubleEntry,
      [newProduct.productname, newProduct.companyname],
      (err, res) => {
        if (err) {
          console.log(err)
          cb(err, null)
          return
        }

        if (res.rows.length > 0) {
          cb({ type: 'product_exist' }, null)
          return
        }

        // Continue with the process to insert the new admin record
        pool.query(getLastIndex, (err, res) => {
          if (err) {
            console.log(err)
            cb(err, null)
            return
          }

          const latestId = res.rows[0].max
          const newId = latestId !== null ? parseInt(latestId) + 1 : 1
          const currentTimeInMilliseconds = new Date().getTime()
          pool.query(
            addProduct,
            [
              newId,
              newProduct.imageurl,
              newProduct.category,
              newProduct.price,
              newProduct.productname,
              newProduct.packsize,
              newProduct.dosageform,
              newProduct.companyname,
              newProduct.productcode,
              currentTimeInMilliseconds,
            ],
            (err, res) => {
              if (err) {
                console.log(err)
                cb(err, null)
                return
              }
              const product = {
                id: res.rows[0].id,
                imageurl: newProduct.imageurl,
                category: newProduct.category,
                price: newProduct.price,
                productname: newProduct.productname,
                packsize: newProduct.packsize,
                dosageform: newProduct.dosageform,
                companyname: newProduct.companyname,
                productcode: newProduct.productcode,
                created_at: newProduct.created_at,
              }
              console.log('product added', product)
              cb(null, product)
            },
          )
        })
      },
    )
  }

  static updateProduct(updateAProduct, cb) {
    try {
      pool.query(
        updateOneProduct,
        [
          updateAProduct.imageurl,
          updateAProduct.category,
          updateAProduct.price,
          updateAProduct.productname,
          updateAProduct.packsize,
          updateAProduct.dosageform,
          updateAProduct.companyname,
          updateAProduct.productcode,
          updateAProduct.id,
        ],
        (err, res) => {
          if (err) {
            console.log(err)
            cb(err, null)
            return
          }

          const product = {
            id: updateAProduct.id,
            imageurl: updateAProduct.imageurl,
            category: updateAProduct.category,
            price: updateAProduct.price,
            productname: updateAProduct.productname,
            packsize: updateAProduct.packsize,
            dosageform: updateAProduct.dosageform,
            companyname: updateAProduct.companyname,
            productcode: updateAProduct.productcode,
          }
          console.log('product updated', product)
          cb(null, product)
        },
      )
    } catch (error) {
      cb(error, null)
    }
  }

  static getAllProducts(offset, limit, cb) {
    pool.query(getAllProducts, [offset, limit], (err, res) => {
      if (err) {
        console.log(err.message)
        cb(err, null)
        return
      } else if (res.rows.length == 0) {
        console.log('No products to show at the moment')
        cb({ type: 'no_products' }, null)
        return
      } else {
        checkAndReplaceNull(res.rows)
        // console.log("Available products", res.rows)
        cb(null, res.rows)
      }
    })
  }

  static getAllProductsWithoutLimit(cb) {
    try {
      pool.query(getAllProductsWithoutLimit, (err, res) => {
        if (err) {
          console.log(err.message)
          cb(err, null)
          return
        } else if (res.rows.length == 0) {
          console.log('No products to show at the moment')
          cb({ type: 'no_products' }, null)
          return
        } else {
          checkAndReplaceNull(res.rows)
          // console.log("Available products", res.rows)
          cb(null, res.rows)
        }
      })
    } catch (error) {
      cb(error, null)
    }
  }

  static getProductsByName(productname, cb) {
    try {
      pool.query(getProductsByName, [`%${productname}%`], (err, res) => {
        if (err) {
          console.log(err.message, err)
          cb({ err: 'no_products' })
          return
        } else if (res.rows.length == 0) {
          cb({ err: 'no_products' }, [])
          return
        } else {
          checkAndReplaceNull(res.rows)
          cb(null, res.rows)
        }
      })
    } catch (error) {
      cb(error, null)
    }
  }

  static getProductsByCategory(category, cb) {
    pool.query(getProductsByCategory, [`%${category}%`], (err, res) => {
      if (err) {
        console.log(err.message)
        cb(err, null)
        return
      } else if (res.rows.length == 0) {
        console.log('No products in that category')
        cb({ type: 'no_products' }, null)
        return
      } else {
        checkAndReplaceNull(res.rows)
        console.log('Available products', res.rows)
        cb(null, res.rows)
      }
    })
  }

  static getProductById(id, cb) {
    pool.query(getProductById, [id], (err, res) => {
      if (err) {
        console.log(err.message)
        cb(err, null)
        return
      } else if (res.rows.length == 0) {
        console.log('No product with that id')
        cb({ type: 'no_product' }, null)
        return
      } else {
        checkAndReplaceNull(res.rows)
        console.log('product: ', res.rows[0])
        cb(null, res.rows[0])
      }
    })
  }

  static getProductByProductcode(productcode, cb) {
    pool.query(getProductByProductcode, [productcode], (err, res) => {
      if (err) {
        console.log(err.message)
        cb(err, null)
        return
      } else if (res.rows.length == 0) {
        console.log('No product with that productcode')
        cb({ type: 'no_product' }, null)
        return
      } else {
        checkAndReplaceNull(res.rows)
        console.log('product: ', res.rows[0])
        cb(null, res.rows[0])
      }
    })
  }

  static getProductsDistinctDosageForms(cb) {
    pool.query(getProductsDistinctDosageForms, (err, res) => {
      if (err) {
        console.log(err.message)
        cb(err, null)
        return
      } else if (res.rows.length == 0) {
        console.log('No dosage forms to display')
        cb({ type: 'no_dosage_forms' }, null)
        return
      } else {
        checkAndReplaceNull(res.rows)
        console.log('all dosage forms: ', res.rows)
        cb(null, res.rows)
      }
    })
  }

  static getProductsCategories(cb) {
    try {
      pool.query(getProductsCategories, (err, res) => {
        if (err) {
          console.log(err.message)
          cb(err, null)
          return
        } else if (res.rows.length == 0) {
          console.log('No categories to display')
          cb({ type: 'no_categories' }, null)
          return
        } else {
          checkAndReplaceNull(res.rows)
          console.log('all categories: ', res.rows)
          cb(null, res.rows)
        }
      })
    } catch (error) {
      cb(error, null)
    }
  }
}

module.exports = Product
