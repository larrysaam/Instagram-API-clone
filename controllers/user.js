const User = require('../model/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//create new user account
exports.user_signup = (req, res)=>{
    const {username, email, password} = req.body
    console.log(username + email + password)
    User.find({"email": email}).exec()
    .then(users=>{
        if(users.length >= 1){
            res.status(409).json({
                error:{
                    message: 'Mail exists'
                } 
            })
        }else{
            bcrypt.hash(password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: username,
                        email: email,
                        password: hash,
                        profile_picture: "",
                        followers_num: 0,
                        following_num: 0,
                        posts_num: 0,
                        bio: "",
                        followers: [],
                        following: [],
                        posts: [],
                        saved: [],
                        tagged: []
                    })
                    user.save()
                    .then(result=>{
                        res.status(200).json({
                            status: 200,
                            message: "OK",
                            data: user
                        })
                    })
                    .catch(err=>{
                        res.status(500).json(
                            {error: {
                                message: err,
                                solution: "Check internet connection!!"
                            }}
                        )
                    })
                }
            })
        }
    })
    .catch(err=>{
        res.status(500).json(
            {error: {
                message: err,
                solution: "Check internet connection!!!"
            }}
        )
    })
    
   
}


//login user
exports.user_login = (req, res)=>{
    const {email, password} = req.body
    console.log(req.body.email +  req.body.password)
    User.find({"email" : email})
    .exec()
    .then(users=>{
        if(users.length<=0){
            res.status(401).json(
                {
                    status: 402,
                    message: "Auth failed!"
                }
            )
        }else{
            
            //decrypt password and compare
            bcrypt.compare(password, users[0].password, (err, result)=>{
                if(err){
                    res.status(401).json(
                        {
                            status: 401,
                            message: "Auth failed"
                        }
                    )
                }
                if(result){
                    //signin with jwt 
                    const token = jwt.sign({
                        email: users[0].email,
                        id: users[0]._id
                    }, 
                    "saamslarrien",
                    {
                        expiresIn: "600s"
                    }
                    )
                    return res.status(200).json(
                        {
                            status: 200,
                            message: "Auth successful",
                            data: users[0], 
                            token: token
                        }
                    )
                }else{
                    res.status(401).json(
                        {
                            status: 404,
                            message: "Auth failed"
                        }
                    )
                }
                
            })
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


//get all users searched by username
exports.user_get_all =(req, res)=>{
    const username = req.params.username
    console.log(username)
    User.find({username: { '$regex': username, '$options': 'i' }}, {})
    .exec()
    .then(users=>{
        res.status(200).json({
            data: users
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}


//follow a user
exports.user_add_follow = (req, res)=>{
    const {follower, followed, followers_num, following_num, followers} = req.body
    console.log(followers)
    var opt = false
    for(var i =0 ; i<followers.length; i++){
        if(followers[i]===follower){
            opt=true
            break
        }else{
            opt=false
        }
    }
    if(!opt){
        //
        User.findByIdAndUpdate({_id: followed}, {$push : {followers: follower}, followers_num: followers_num + 1})
        .exec()
        .then(result=>{
            //update follower following array by adding followed user_id to following array
            User.findByIdAndUpdate({_id: follower}, {$push : {following: followed}, following_num: following_num + 1})
            .exec()
            .then(result=>{
                res.status(200).json(
                    {
                        message: "OK"
                    }
                )
            })
            .catch(err=>{
                res.status(500).json(
                    {
                        message: err 
                    }
                )
            })
        })
        .catch(err=>{
            res.status(500).json(
                {
                    message: err 
                }
            )
        })

       
    }
    
}


//get user details
exports.user_get = (req, res)=>{
    const id = req.params.id
    console.log(id)
    User.findById({_id: id}).exec()
    .then((users)=>{
        if(users.length<1){
            res.status(404).json({
                message: "Not found"
            })
        }else{
            res.status(200).json(
                {
                    length: users.length,
                    data: users 
                }
            )
        }
    })
    .catch((err)=>{
        res.status(500).json(
            {error: {
                message: err,
                solution: "Check internet connection"
            }}
        )
    })
}


//edit user account info
exports.user_edit = (req, res)=>{
    res.status(200).json({msg: "user data changed successfuly"})
}


//delete signup user account
exports.user_delete = (req, res)=>{
    const id = req.params.id
    User.remove({_id: id}).exec()
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