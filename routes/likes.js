const express = require('express')
const checkAuth = require('../middleware/check-auth')
const likesController = require('../controllers/like')
const router = express.Router()

//get all likes of post with id
router.get('/:id', likesController.likes_get_all_by_postId)

//like or unike post with id
router.patch('/', checkAuth, likesController.like_or_unlike_post)

module.exports = router