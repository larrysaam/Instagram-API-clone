const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: String , 
        require: true
    },
    profile_image: [{
        type: String , 
        require: true
    }],
    username: {
        type: String , 
        require: true
    },
    location: {
        type: String , 
        require: true
    },
    post_image: {
        type: String , 
        require: true
    },
    likes_num: {
        type: Number , 
        require: true
    },
    comments_num: {
        type: Number , 
        require: true
    },
    likes: [{
        type: String , 
        require: true
    }],
    comments: [{
        type: String , 
        require: true
    }],
    description: {
        type: String , 
        require: true
    },
    post_date: {
        type: String , 
        require: true
    }
})

module.exports = mongoose.model('Post', postSchema)