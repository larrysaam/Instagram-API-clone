const Post = require('../model/postModel')
const mongoose = require('mongoose')


//create new post.(only by auth users)
exports.post_create =(req, res)=>{
    const {userId, username, location, description, post_date} = req.body
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        userId: userId,
        profile_image:  "",
        username: username,
        location: location,
        post_image: req.file.path,
        likes_num: 0,
        comments_num: 0,
        likes: [],
        comments:  [],
        description: description,
        post_date: post_date
    })
    post.save()
    .then(result=>{
        res.status(200).json({
            status: 200,
            message: "OK",
            data: post
        })
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


//get post by id
exports.post_get_byId =  (req, res)=>{
    const id = req.params.id
    Post.findById({_id: id})
    .exec()
    .then(posts=>{
        if(posts.length<=0){
            res.status(404).json(
                {
                    status: 404,
                    message: "Not Found"
                }
            )
        }else{
            res.status(200).json(
                {
                    status: 200,
                    message: "Ok",
                    data: posts
                }
            )
        }
    }).catch(err=>{
        res.status(500).json(
            {error: {
                message: err,
                solution: "Check internet connection"
            }}
        )
    })
}


//get all available posts
exports.post_get_all =(req, res)=>{
    Post.find()
    .exec()
    .then(posts=>{
        if(posts.length<=0){
            res.status(404).json(
                {
                    status: 404,
                    message: "Not Found"
                }
            )
        }else{
            const response = {
                length: posts.length,
                data: posts.map(post=>{
                    return{
                        _id: post._id,
                        userId: post.userId,
                        profile_image: post.profile_image,
                        username: post.username,
                        location: post.location,
                        post_image: post.post_image,
                        likes_num: post.likes_num,
                        comments_num: post.comments_num,
                        likes: post.likes,
                        comments: post.comments,
                        description: post.description,
                        post_date: post.post_date
                    }
                })  
            }
            res.status(200).json(
                {
                    status: 200,
                    message: "Ok",
                    data: response
                }
            )
        }
    }).catch(err=>{
        res.status(500).json(
            {error: {
                message: err,
                solution: "Check internet connection"
            }}
        )
    })
}



//delete post
exports.post_delete = (req, res)=>{
    const id = req.params.id
    Post.remove({_id: id}).exec()
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