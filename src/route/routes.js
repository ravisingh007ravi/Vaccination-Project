const express = require("express");
const router = express.Router()
const {createUser ,UpdateUser,userLogIn} = require('../controller/usercontroller')
const {createSlot ,bookSlot} = require('../controller/slotsController')
const {userDetails, loginAdmin} = require('../controller/adminController')
const { AdminAuthenticate, AdminAuthorization } = require('../middleware/AdminAuthentication')
const { UserAuthentication, UserAuthorization } = require('../middleware/UserAuthentication')
 
router.post("/register", createUser)
router.put('/user/:userId/profile',UserAuthentication,UserAuthorization,UpdateUser)
router.get('/logIn',userLogIn)

router.post('/registerSlot',createSlot)
router.put('/bookSlots/:userId/:slotId',bookSlot)

router.get('/admin/getUserDetails',AdminAuthenticate, AdminAuthorization,userDetails)
router.get('/admin/login',loginAdmin)

module.exports = router;