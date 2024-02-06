const express = require('express')
const userController = require('../controllers/user')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()


//verify if user with credentials exist
router.post("/login", userController.user_login)

//create new user account
router.post('/signup', userController.user_signup)

//get user details
router.get('/:id', userController.user_get)

//get all users details
router.get('/search/:username', userController.user_get_all)

//follow user
router.patch('/follow', checkAuth, userController.user_add_follow)

//edit user info
router.put('/:id',  checkAuth, userController.user_edit)

//delete user 
router.delete('/:id',checkAuth, userController.user_delete)


module.exports = router