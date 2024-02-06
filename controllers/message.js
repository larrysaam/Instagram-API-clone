const Message = require('../model/messageModel')
const mongoose = require('mongoose')


//get all messages btw 2 specific users
exports.messages_gete_all =(req, res)=>{
    const id = req.params.id

    Message.findById({_id: id})
    .exec()
    .then(messages=>{
        res.status(200).json({
            status: 200,
            message: 'OK',
            length: messages.length,
            _id: messages._id,
            data: messages.messages
        })
    })
    .catch(err=>{
        res.status(500).json(
            {error: {
                message: err,
                solution: "Check internet connection"
        }})
    })
}


//send message to a user
exports.message_send = (req, res)=>{
    const {_id, initiator, receptor, author, body, send_time} = req.body
    console.log(req.body)
    //verify if a conversation connection exists btw users
    Message.findById({_id: _id}).exec()
    .then(messages=>{
        console.log(messages)
        if(!messages || messages.length<=0){
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
                        message_id: message._id,
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
             * ____________________PATCH request________________________
             * |                                                     |
             * | conversation connection already exists between users|
             * | Hence, edit messages array by adding new message    |
             * |_____________________________________________________|
             * 
            */


            Message.findByIdAndUpdate({_id: _id}, 
                {$push : {
                    messages: {
                        message_id: initiator + receptor,
                        author: author,
                        body:  body,
                        send_time: send_time
                    }
                }})
                .exec()
                .then(result=>{
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
                }
            )
        }

    })
    .catch(err=>{
        console.log(err)

        res.status(500).json(
            {error: {
                message: err,
                solution: "Check internet connection"
            }}
        )
    })
}


//get message by writen or send to user with id
exports.message_get_byId = (req, res)=>{
    const id = req.params.id
    Message.find({$or: [{"initiator": id},{"receptor": id}]})
    .exec()
    .then(messages=>{
        
        res.status(200).json({
            length: messages.length,
            data: messages.map(user=>{
                return({
                    _id: user._id,
                    initiator: user.initiator,
                    receptor: user.receptor
                })
            })
        })

    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}


//delete message send by sender himself
exports.message_delete = (req, res)=>{
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
}