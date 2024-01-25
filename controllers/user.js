const User = require('../model/userModel')


//create new user account
exports.user_signup = (req, res)=>{
    const {username, email, password} = req.body
    User.find({email: email}).exec()
    .then(users=>{
        if(userslength >= 1){
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
                                solution: "Check internet connection"
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
                solution: "Check internet connection"
            }}
        )
    })
    
   
}


//login user
exports.user_login = (req, res)=>{
    const {email, password} = req.body
    User.find({email : email})
    .exec()
    .then(users=>{
        if(users.length<=0){
            res.status(401).json(
                {
                    status: 401,
                    message: "Auth failed"
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
                    const token = jwt.sign({
                        email: users[0].email,
                        id: users[0]._id
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                    )
                    return res.status(200).json(
                        {
                            status: 200,
                            message: "Auth successful",
                            token: token
                        }
                    )
                }
                res.status(401).json(
                    {
                        status: 404,
                        message: "Auth failed"
                    }
                )
            })
            res.status(200).json(
                {
                    status: 200,
                    message: "Ok",
                    data: users
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