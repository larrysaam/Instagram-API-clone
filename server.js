const http = require('http')
const app = require('./app')
const { Server } = require('socket.io')

var onlineUsers = []

//server port
const port = 5000
const server = http.createServer(app)

//socket.io connection
const io = new Server(server, {
    cors:{
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"]
    },
})

io.on("connection", (socket)=>{
    console.log("new user connected with socketId: ",socket.id)

    // listern to a custom connection
    socket.on("addNewUser", (userId)=>{
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            })
        console.log("online users : ", onlineUsers)
    })

    //add message
    socket.on("sendMessage", (message)=>{
        console.log("message sent : ", message)
        const user = onlineUsers.find(user => user.userId === message.receiver)

        if(user){
            console.log("message send ", message)
            io.to(user.socketId).emit("getMessage", message)
        }
    })


    //remove user from online users when offline
    socket.on("disconnect", ()=>{
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
    })
})


server.listen(port, ()=>console.log("sever is running on port 5000"))
