const express = require("express");
const router = express.Router()
const {createUser ,UpdateUser} = require('../controller/usercontroller')
// const x = function(req,res)
// {
//   return res.status(200).send({ status : true , msg : "working"})
// }
router.post("/register", createUser)
router.put('/user/:userId/profile',UpdateUser)
module.exports = router;