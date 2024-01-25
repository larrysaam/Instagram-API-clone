const Post = require('../model/postModel')



//get all comments of this post with id
exports.comment_get_by_postId = (req, res)=>{
    const id = req.params.id
    Post.findById({_id: id}).exec()
    .then(posts=>{
        res.status(200).json(
            {
                status: 200,
                length: posts.comments_num,
                data: posts.comments
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
}


//add comment to a post
exports.comment_add = (req, res)=>{
    const id = req.params.id
    const new_comment = req.body.comment
    const new_comment_num = req.body.comments_num + 1
    
    Post.findByIdAndUpdate({_id: id}, { $push: {comments: new_comment }, comments_num: new_comment_num})
    .exec()
    .then(result=>{
        res.status(200).json({
            status: 200,
            message: 'OK'
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