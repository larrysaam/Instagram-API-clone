const express = require('express')
const checkAuth = require('../middleware/check-auth')
const commentController = require('../controllers/comment')
const router = express.Router()

//get all comments of this post with id
router.get('/:id', commentController.comment_get_by_postId)


//add comment to a post
router.patch('/',  checkAuth, commentController.comment_add)

module.exports = router