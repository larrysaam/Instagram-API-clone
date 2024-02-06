const express = require('express')
const checkAuth = require('../middleware/check-auth')
const messageController = require('../controllers/message')
const router = express.Router()


//get all messages available between 2 users by message id
router.get('/all/:id', checkAuth,  messageController.messages_gete_all)

//get message by writen or send to user with id
router.get('/:id', checkAuth, messageController.message_get_byId)

//send a message to a user
router.post('/', checkAuth, messageController.message_send)

//delete message send by message_id
router.delete('/:id', checkAuth, messageController.message_delete)

module.exports = router