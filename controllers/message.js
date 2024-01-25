const Message = require('../model/messageModel')


//get all messages btw 2 specific users
exports.messages_gete_all =(req, res)=>{
    const receptor = req.body.receptor
    const initiator = req.body.initiator

    Message.find({initiator: initiator , receptor: receptor})
    .exec()
    .then(messages=>{
        res.status(200).json({
            status: 200,
            message: 'OK',
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
    const {id, initiator, receptor, author, body, send_time} = req.body

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
             * ____________________PATCH request________________________
             * |                                                     |
             * | conversation connection already exists between users|
             * | Hence, edit messages array by adding new message    |
             * |_____________________________________________________|
             * 
            */


            Message.findByIdAndUpdate({_id: id}, 
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
        res.status(500).json(
            {error: {
                message: err,
                solution: "Check internet connection"
            }}
        )
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