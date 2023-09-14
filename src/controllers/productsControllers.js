const client = require('../connections/connection.init')
const fs = require('fs')
const parse = require('csv-parse').parse
const { Parser } = require('json2csv')
const _ = require('lodash')
const Product = require('../models/productsModel')

exports.addBulkProducts = (req, res) => {
  const data = fs.readFileSync('./src/data/products.csv')
  parse(data, (err, records) => {
    if (err) {
      console.error(err)
      res.status(400).json({ success: false, message: 'An error occurred' })
    }
    records.shift()
    /*let id = 1
        for (let i = 0; i < records.length; i++) {
            records[i].splice(0, 0, id)
            records[i].push(new Date())
            id = id + 1
        }
        const csv = new Parser().parse(records)
        fs.writeFile("./src/data/newProducts.csv", csv, (err) => {
            if (err) {
                console.log(err)
                res.status(500).json({message : 'error_occurred'})
            }
            console.log("File created")
            res.status(200).json({message : "New Products file successfully created", data : records})
        }) */
  })
}

exports.addProduct = (req, res) => {
  if (_.isEmpty(req.body)) {
    // Simplified the condition for _.isEmpty()
    res.status(400).json({ message: 'Enter request body' }) // Updated error message
    return
  }

  const {
    imageurl,
    category,
    price,
    productname,
    packsize,
    dosageform,
    companyname,
    productcode,
  } = req.body

  const requiredFields = [
    { field: imageurl, name: 'image url' },
    { field: category, name: 'category' },
    { field: price, name: 'price' },
    { field: productname, name: 'product name' },
    { field: packsize, name: 'pack size' },
    { field: dosageform, name: 'dosage form' },
    { field: companyname, name: 'company name' },
    { field: productcode, name: 'product code' },
  ]

  for (const field of requiredFields) {
    if (
      !field.field ||
      typeof field.field !== 'string' ||
      field.field.trim().length === 0
    ) {
      res.json({ data: `${field.name} is required` })
      return
    }
  }

  // Capitalize first letter of input fields values...
  const formatInputField = (value) => {
    return (
      value.trim().charAt(0).toUpperCase() + value.trim().slice(1).toLowerCase()
    )
  }

  const new_imageurl = formatInputField(imageurl)
  const new_category = formatInputField(category)
  const new_price = formatInputField(price)
  const new_productname = formatInputField(productname)
  const new_packsize = formatInputField(packsize)
  const new_dosageform = formatInputField(dosageform)
  const new_companyname = formatInputField(companyname)
  const new_productcode = formatInputField(productcode)

  console.log(new_imageurl)
  console.log(new_category)
  console.log(new_price)
  console.log(new_packsize)

  const product = new Product(
    new_imageurl,
    new_category,
    parseInt(new_price),
    new_productname,
    new_packsize,
    new_dosageform,
    new_companyname,
    new_productcode,
  )

  try {
    Product.addProduct(product, (err, result) => {
      if (err) {
        if (err.type==="product_exist") {
        return res.json({ data: "Product_exist"})
        } 
       return res.json({ data: "Server_error" })
      } else {
      return  res.json({ data: result })
      }
    })
  } catch (error) {
   return res.json({ data: error })
  }
}


exports.updateAProduct = (req, res) => {
  if (_.isEmpty(req.body) != true) {
    const {
      id,
      imageurl,
      category,
      price,
      productname,
      packsize,
      dosageform,
      companyname,
      productcode,
    } = req.body
    if (id == null) {
      res.status(400).json({ message: 'id is required' })
      return
    }
    if (imageurl.trim().length === 0 || imageurl === null) {
      res.status(400).json({ message: 'image url is required' })
      return
    }
    if (category.trim().length === 0 || category === null) {
      res.status(400).json({ message: 'category is required' })
      return
    }
    if (price.length === 0 || price === null) {
      res.status(400).json({ message: 'price is required' })
      return
    }
    if (productname.trim().length === 0 || productname === null) {
      res.status(400).json({ message: 'product name is required' })
      return
    }

    if (packsize.trim().length === 0 || packsize === null) {
      res.status(400).json({ message: 'pack size is required' })
      return
    }
    if (dosageform.trim().length === 0 || dosageform === null) {
      res.status(400).json({ message: 'dosage form  is required' })
      return
    }
    if (companyname.trim().length === 0 || companyname === null) {
      res.status(400).json({ message: 'company name is required' })
      return
    }
    if (productcode.trim().length === 0 || productcode === null) {
      res.status(400).json({ message: 'product code is required' })
      return
    }
    // Capitalize first letter of input fields values...
    const formatInputField = (value) => {
      let new_value = value.trim().toLowerCase()
      let capitalizedValue =
        new_value.charAt(0).toUpperCase() + new_value.slice(1)
      return capitalizedValue
    }
    const new_imageurl = imageurl
    const new_category = formatInputField(category)
    const new_price = price
    const new_productname = formatInputField(productname)
    const new_packsize = formatInputField(packsize)
    const new_dosageform = formatInputField(dosageform)
    const new_companyname = formatInputField(companyname)
    const new_productcode = formatInputField(productcode)

    console.log(new_imageurl)
    console.log(new_category)
    console.log(new_price)
    console.log(new_packsize)

    const product = new Product(
      new_imageurl,
      new_category,
      new_price,
      new_productname,
      new_packsize,
      new_dosageform,
      new_companyname,
      new_productcode,
      id,
    )
    console.log(product)
    Product.updateProduct(product, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'server_error' })
      } else {
        res.status(201).json({ message: 'product_updated', data: result })
      }
    })
  } else {
    res.status(400).json({ message: 'enter request body' })
    return
  }
}
const capitalizeFirstLetter = (str) => {
  const str2 = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  return str2
}

exports.getProductsByName = (req, res) => {
  if (_.isEmpty(req.body) != true) {
    const { productname } = req.body
    if (productname.trim().length == 0 || productname == null)
      return res.status(400).json({ message: 'enter product name' })

    try {
      const formatedProductname = capitalizeFirstLetter(productname.trim())
      console.log(formatedProductname)
      Product.getProductsByName(formatedProductname, (err, result) => {
        if (result == []) {
          res.send({ products: result, statusCode: 204 })
        } else {
          res.status(200).json({ products: result, statusCode: 200 })
        }
        // if (err) {
        //     if (err['type'] == "no_products") {
        //         res.status(204).json({message : "no_products",statusCode:204})
        //     }else {
        //         res.status(500).json({message : "server_error",statusCode:500})
        //     }
        // }else {
        //     res.status(200).json({products : result,statusCode:200})
        // }
      })
    } catch (error) {
      res.status(500).json({ error: error, statusCode: 500 })
    }
  } else {
    res.status(400).json({ message: 'enter request body' })
    return
  }
}

exports.getProductsByCategory = (req, res) => {
  if (_.isEmpty(req.body) != true) {
    const { category } = req.body
    if (category.trim().length == 0 || category == null) {
      res.status(400).json({ message: 'category is required' })
      return
    }
    // const formatedCategory = capitalizeFirstLetter(category.trim())
    console.log(category.trim())
    Product.getProductsByCategory(category.trim(), (err, result) => {
      if (err) {
        if (err.type == 'no_products') {
          res.status(204).json({ message: 'no_products' })
        } else {
          res.status(500).json({ message: 'server_error' })
        }
      } else {
        res.status(200).json({ products: result })
      }
    })
  } else {
    res.status(400).json({ message: 'enter request body' })
    return
  }
}

exports.getAllProducts = (req, res) => {
  if (req) {
    if (req.query.page != undefined) {
      const page = req.query.page
      let limit
      if (req.query.limit) {
        limit = req.query.limit
      } else {
        limit = 10
      }
      //req.query.limit ? limit = req.query.limit : limit = 10
      const offset = (page - 1) * 10

      Product.getAllProducts(offset, limit, (err, result) => {
        if (err) {
          if (err.type == 'no_products') {
            res.status(204).json({ message: 'no_products' })
          } else {
            res.status(500).json({ message: 'server_error' })
          }
        } else {
          res.status(200).json({ products: result })
        }
      })
    } else {
      res.status(500).json({ message: 'enter a page number' })
    }
  }
}

exports.getAllProductsWithoutLimit = (req, res) => {
  if (req) {
    Product.getAllProductsWithoutLimit((err, result) => {
      if (err) {
        if (err.type == 'no_products') {
          res.status(204).json({ message: 'no_products' })
        } else {
          res.status(500).json({ message: 'server_error' })
        }
      } else {
        res.status(200).json({ products: result })
      }
    })
  }
}

exports.getProductById = (req, res) => {
  if (req) {
    const id = req.params.id
    console.log(id)
    Product.getProductById(id, (err, result) => {
      if (err) {
        if (err.type == 'no_product') {
          res.status(204).json({ message: 'no_product' })
        } else {
          res.status(500).json({ message: 'server_error' })
        }
      } else {
        res.status(200).json({ product: result })
      }
    })
  }
}

exports.getProductByProductcode = (req, res) => {
  if (req) {
    const productcode = req.params.productcode
    Product.getProductByProductcode(productcode, (err, result) => {
      if (err) {
        if (err.type == 'no_product') {
          res.status(204).json({ message: 'no_product' })
        } else {
          res.status(500).json({ message: 'server_error' })
        }
      } else {
        res.status(200).json({ product: result })
      }
    })
  }
}

exports.getProductsDistinctDosageForms = (req, res) => {
  if (req) {
    Product.getProductsDistinctDosageForms((err, result) => {
      if (err) {
        if (err.type == 'no_dosage_forms') {
          res.status(204).json({ message: 'no_dosage_forms' })
        } else {
          res.status(500).json({ message: 'server_error' })
        }
      } else {
        dosageFormsArray = []
        for (drug of result) {
          dosageFormsArray.push(drug.dosageform)
        }
        res.status(200).json({ dosage_forms: dosageFormsArray })
      }
    })
  }
}

exports.getProductsCategories = (req, res) => {
  if (req) {
    Product.getProductsCategories((err, result) => {
      if (err) {
        if (err.type == 'no_categories') {
          res.status(204).json({ message: 'no_categories' })
        } else {
          res.status(500).json({ message: 'server_error' })
        }
      } else {
        categoriesArray = []
        for (category of result) {
          categoriesArray.push(category.category)
        }
        res.status(200).json({ categories: categoriesArray })
      }
    })
  }
}

function checkAndReplaceNull(data) {
  for (const obj of data) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === null) {
          if (key === 'price') {
            obj[key] = 0
          } else {
            obj[key] = ''
          }
        }
      }
    }
  }
}
