const express=require('express')
const path=require('path')
const http=require('http')
const socketio=require('socket.io')
const formatMessage=require('./utils/messages')

const app=express()
const server=http.createServer(app)
const io=socketio(server)

//setting static page
app.use(express.static(path.join(__dirname,'public')))

const botname='chatitout bot'

//run when client connects
io.on('connection',socket=>{
    console.log("New WebSocket Connected...")

    //new user
    socket.emit('message',formatMessage(botname,'Welcome to Chat It Out'))

    //Broadcast when a user connects
    socket.broadcast.emit('message',formatMessage(botname,'A user has joined the chat'))

    //Runs when client disconnects
    socket.on('disconnect',()=>{
        io.emit('message',formatMessage(botname,'A user has left the chat'))
    })

    socket.on('chatmessage',msg=>{
        io.emit('message',formatMessage('USER',msg))
    })

})


const PORT=3000||process.env.PORT

server.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
