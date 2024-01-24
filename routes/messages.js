const mongoose = require('mongoose')
const express = require('express')
const Message = require('../model/messageModel')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()


//get all messages available between 2 users
router.get('/', checkAuth, (req, res)=>{

})


//send a message to a user
router.post('/', checkAuth, (req, res)=>{
    const {_id, initiator, receptor, author, body, send_time} = req.body

    //verify if a conversation connection exists btw users
    Message.findById({_id: id}).exec()
    .then(messages=>{
        if(messages.length<=0){
            //Message object created
            const message = new Message({
                _id: new mongoose.Types.ObjectId(),
                initiator: initiator,
                receptor: receptor,
                messages: [
                    {
                        message_id: initiator + receptor,
                        author: author,
                        body:  body,
                        send_time: send_time
                    }
                ]
            })
            //save the new coversation created between the 2 users
            message.save()
            .then(messages=>{
                res.status(200).json(
                    {
                        status: 200,
                        message: "Ok",
                        data: messages
                    }
                )
            })
            .catch(err=>{
                res.status(500).json(
                    {error: {
                        message: err,
                        solution: "Check internet connection"
                    }}
                )
            })
        }else{
            
            /**
             * ____________________PUT request________________________
             * |                                                     |
             * | conversation connection already exists between users|
             * | Hence, edit messages array by adding new message    |
             * |_____________________________________________________|
             * 
             * 
             * 
             * ___________________CODE goes here_______________________
             * 
             * 
             * 
            */

        }

    })
    .catch(err=>{
        res.status(500).json(
            {error: {
                message: err,
                solution: "Check internet connection"
            }}
        )
    })
})


//delete message send by message_id
router.delete('/:id',checkAuth, (req, res)=>{
    const id = req.params.id
    Message.remove({_id: id}).exec()
    .then(result=>{
        res.status(200).json(
            {
                status: 200,
                message: "OK"
            })
    }).catch(err=>{
        res.status(500).json(
            {error: {
                message: err,
                solution: "Check internet connection"
            }}
        )
    })
})

module.exports = router