const Post = require('../model/postModel')

//get all likes of posts with id
exports.likes_get_all_by_postId =(req, res)=>{
    const id = req.params.id
    Post.findById({_id: id})
    .exec()
    .then(posts=>{
        res.status(200).json(
            {
                status: 200,
                length: posts.likes_num,
                data: posts.likes
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


 /**
 * ____________________PATCH request______________________
 * |                                                     |
 * | like post if user_id is not found in likers array   |
 * | else unlike post if user_id is in likers array      |
 * |                                                     |
 * |___________________LIKE OR UNLIKE____________________|
 * 
*/

exports.like_or_unlike_post =  (req, res)=>{
    const id = req.body.id
    const user_id = req.body.user_id
    let likers_array = req.body.likes
    console.log(likers_array)
    var opt = false
    for(var i =0 ; i<likers_array.length; i++){
        if(likers_array[i]===user_id){
            opt=true
            break
        }else{
            opt=false
        }
    }
    console.log(opt)
    if(opt === false){
        const likes_num = req.body.likes_num + 1
        Post.findByIdAndUpdate({_id: id}, {$push : {likes: user_id}, likes_num: likes_num})
        .exec()
        .then(result=>{
            res.status(200).json({
                status: 200,
                message: 'liked'
            })
        })
        .catch(err=>{
            res.status(500).json(
                {error: {
                    message: err,
                    solution: "Check internet connection"
            }})
        })
    }else{
        //unlike post
        const likes_num = req.body.likes_num - 1
        Post.findByIdAndUpdate({_id: id}, {$pull : {likes: user_id}, likes_num: likes_num})
        .exec()
        .then(result=>{
            res.status(200).json({
                status: 201,
                message: 'unliked'
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
    
}