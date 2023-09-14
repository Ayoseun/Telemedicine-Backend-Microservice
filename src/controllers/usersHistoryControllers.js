// const UsersHistory = require('../models/usersHistoryModels')

// exports.addHistory = (req, res) => {
//     if (req) {
//         const { productImage, productName, productPrice, location } = req.body
//         if (productImage.trim().length == 0) {
//             res.status(400).json({message : "Product Image Url is required"})
//             return
//         }
//         if (productName.trim().length == 0) {
//             res.status(400).json({message : "Product name is required"})
//             return
//         }
//         if ((productPrice).toString().trim().length == 0) {
//             res.status(400).json({message : "Product price is required"})
//             return
//         }
//         if (location.trim().length == 0) {
//             res.status(400).json({message : "Location is required"})
//             return
//         }

//         const newHistory = new UsersHistory(productImage.trim(), productName.trim(), productPrice, location.trim())
//         UsersHistory.addHistory(newHistory, (err, result) => {
//             if (err) {
//                 res.status(500).json({message:"server_error"})
//             }else {
//                 res.status(201).json({message:"history_created", data : result})
//             }
//         })
//     }
// }

// exports.getAllHistories = (req, res) => {
//     if (req) {
//         UsersHistory.getAllHistories((err, result) => {
//             if (err) {
//                 if (err.type == "no_history") {
//                     res.status(204).json({message : "no_history"})
//                 }else {
//                     res.status(500).json({message : "server_error"})
//                 }
//             }else {
//                 res.status(200).json({histories : result})
//             }
//         })
//     }
// }

// exports.getOneHistory = (req, res) => {
//     if (req) {
//         const { productName } = req.body
//         if (productName.toString().trim().length == 0) {
//             res.status(400).json({message : "Product Name is required"})
//             return
//         }

//         UsersHistory.getOneHistory(productName.trim(), (err, result) => {
//             if (err) {
//                 if (err.type == "no_history") {
//                     res.status(400).json({message : "no_history"})
//                 }else {
//                     res.status(500).json({message : "server_error"})
//                 }
//             }else {
//                 res.status(200).json({history : result})
//             }
//         })
//     }
// }