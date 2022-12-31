const express = require("express");
const router = express.Router()
const {createUser ,UpdateUser,userLogIn} = require('../controller/usercontroller')
const {createSlot ,bookSlot} = require('../controller/slotsController')
const {userDetails, loginAdmin,slotDetails} = require('../controller/adminController')
const { AdminAuthenticate, AdminAuthorization } = require('../middleware/AdminAuthentication')
const { UserAuthentication, UserAuthorization } = require('../middleware/UserAuthentication')
 
router.post("/register", createUser)
router.put('/user/:userId/profile',UserAuthentication,UserAuthorization,UpdateUser)
router.get('/logIn',userLogIn)

router.post('/registerSlot',createSlot)
router.put('/bookSlots/:userId',bookSlot)

router.get('/admin/getUserDetails',userDetails)
router.get('/admin/login',loginAdmin)
router.get('/admin/slotDetails',slotDetails)

module.exports = router;