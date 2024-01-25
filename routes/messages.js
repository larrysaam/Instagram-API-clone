const express = require('express')
const checkAuth = require('../middleware/check-auth')
const messageController = require('../controllers/message')
const router = express.Router()


//get all messages available between 2 users
router.get('/', checkAuth,  messageController.messages_gete_all)

//send a message to a user
router.post('/', checkAuth, messageController.message_send)

//delete message send by message_id
router.delete('/:id',checkAuth, messageController.message_delete)

module.exports = router