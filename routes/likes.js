const express = require('express')
const Post = require('../model/postModel')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

//get all likes of post with id
router.get('/:id', (req, res)=>{
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
})


//like or unike post with id
router.put('/:id', checkAuth, (req, res)=>{
    const id = req.params.id
    res.status(200).json({posts: `all likes for post with id : ${id} available`})
})

module.exports = router