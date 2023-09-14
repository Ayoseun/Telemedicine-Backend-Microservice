// const UsersDetails = require('../models/usersDetailsModels')

// exports.addUsersDetails = (req, res) => {
//     if (req) {
//         const { name, email, phone, image } = req.body
//         if (name.trim().length == 0) {
//             res.status(400).json({message : "name is required"})
//             return
//         }
//         if (email.trim().length == 0) {
//             res.status(400).json({message : "email is required"})
//             return
//         }
//         if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(email.trim())))  {
//             res.status(400).json({message : "email is invalid"})
//             return
//         }
//         if (phone.trim().length == 0) {
//             res.status(400).json({message : "phone number is required"})
//             return
//         }
//         if (phone.replace(/\D/g,'').length < 11) {
//             res.status(400).json({message : "phone number is incorrect"})
//             return
//         }
//         if (image.trim().length == 0) {
//             res.status(400).json({message : "image is required"})
//             return
//         }

//         const newDetails = new UsersDetails(name.trim(), email.trim(), phone.trim(), image.trim())
//         UsersDetails.addUsersDetails(newDetails, (err, result) => {
//             if (err) {
//                 res.status(500).json({message:"server_error"})
//             }else {
//                 res.status(201).json({message:"details_added", data : result})
//             }
//         })
//     }
// }

// exports.getUsersDetails = (req, res) => {
//     if (req) {
//         UsersDetails.getUsersDetails((err, result) => {
//             if (err) {
//                 if (err.type == "no_details") {
//                     res.status(204).json({message : "no_details"})
//                 }else {
//                     res.status(500).json({message : "server_error"})
//                 }
//             }else {
//                 res.status(200).json({details : result})
//             }
//         })
//     }
// }
