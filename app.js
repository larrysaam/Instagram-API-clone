const express = require('express')
const userRoute = require('./routes/user')
const postsRoute = require('./routes/posts')
const messageRoute = require('./routes/messages')
const likesRoute = require('./routes/likes')
const commentsRoute = require('./routes/comments')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

//connecting to mongodb atlas database (Cloud)
mongoose.connect('mongodb+srv://Larrien:qwerty123456@cluster0.u7xnpo6.mongodb.net/Instagram_clone?retryWrites=true&w=majority')

//middlewares
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))


//avoid cors errors
app.use(cors())


//all available routes
app.use('/user', userRoute)
app.use('/likes', likesRoute)
app.use('/posts',  postsRoute)
app.use('/message', messageRoute)
app.use('/comment', commentsRoute)


//in case route is not available
app.use((req, res)=>{
    const error = new Error('page not found')
    error.message = 'page not found !'
    res.status(500).json({error : {msg: error.message}})
})
 
module.exports = app