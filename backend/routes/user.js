const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controller/auth");
const {updateStatus, getAllUsers,deleteUser} =require("../controller/user")
const router=express.Router()


router.post("/update-status",updateStatus)
router.get("/get-users",getAllUsers)
router.post("/delete-user",deleteUser)

module.exports=router