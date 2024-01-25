const express = require('express')
const userController = require('../controllers/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()


//verify if user with credentials exist
router.get("/login", userController.user_login)

//create new user account
router.post('/signup', userController.user_signup)

//edit user info
router.put('/:id', userController.user_edit)

//delete user 
router.delete('/:id',checkAuth, userController.user_delete)


module.exports = router