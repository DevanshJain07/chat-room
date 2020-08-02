const express=require('express')
const path=require('path')
const http=require('http')
const socketio=require('socket.io')
const formatMessage=require('./utils/messages')
const {userJoin,getCurrentUser,userLeave,getRoomUsers}=require('./utils/users')

const app=express()
const server=http.createServer(app)
const io=socketio(server)

//setting static page
app.use(express.static(path.join(__dirname,'public')))

const botname='chatitout bot'

//run when client connects
io.on('connection',socket=>{

    socket.on('joinRoom',({username,room})=>{

        const user=userJoin(socket.id,username,room)

        socket.join(user.room)

    //new user
    socket.emit('message',formatMessage(botname,'Welcome to Chat It Out'))

    //Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message',formatMessage(botname,`A ${user.username} has joined the chat`))
    })
    
    

    //listen for chatmessage
    socket.on('chatmessage',msg=>{
        const user=getCurrentUser(socket.id)
        io.to(user.room).emit('message',formatMessage(user.username,msg))
    })
    //Runs when client disconnects
    socket.on('disconnect',()=>{
        const user=userLeave(socket.id)
        if(user){
            io.to(user.room).emit('message',formatMessage(botname,`A ${user.username} has left the chat`))
        }
    })
})


const PORT=3000||process.env.PORT

server.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
