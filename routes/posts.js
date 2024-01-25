const express = require('express')
const router = express.Router()
const Post = require('../model/postModel')
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const postController = require('../controllers/post')
const mongoose = require('mongoose')


//storing image file
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')      //you tell where to upload the files,
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
  })

//image filter, accepts only jpeg and png
const fileFilter = (req, file, cb)=>{
    if(file.minetype === 'image/jpeg' || file.minetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}
const upload = multer({storage: storage, limits:{
    fileSize: 1024 * 1024 * 5
},
    fileFilter: fileFilter
})



//create new post.(only by auth users)
router.post('/', checkAuth, upload.single('post_image'), postController.post_create)

//get post with id
router.get('/:id', postController.post_get_byId)

//get all post available
router.get('/', postController.post_get_all)

//delete post made only by user
router.delete('/:id', checkAuth, postController.post_delete)

module.exports = router