const express = require('express')
const Post = require('../model/postModel')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()

//get all comments of this post with id
router.get('/:id', checkAuth, (req, res)=>{
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
})


//add comment to a post
router.put('/:id', checkAuth, (req, res)=>{
    const id = req.params.id
    const new_comment = req.body.comment
    res.status(200).json({Comments: `create comment for post with id : ${id}`})
})

module.exports = router