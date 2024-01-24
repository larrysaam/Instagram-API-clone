const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    initiator: {
        type: String, 
        require: true
    },
    receptor: {
        type: String, 
        require: true
    },
    messages: [
        {
            message_id: {
                type: String, 
                require: true
            },
            author:{
                type: String, 
                require: true
            },
            body: {
                type: String, 
                require: true
            },
            send_time: {
                type: String, 
                require: true
            },
        }
    ]
})

module.exports = mongoose.model('Message', messageSchema)