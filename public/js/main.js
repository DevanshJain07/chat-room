const socket=io()
const chatForm=document.getElementById('chat-form')
const chatMessages=document.querySelector('.chat-messages')
const roomName=document.getElementById('room-name')
const userList=document.getElementById('users')

const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

console.log(username,room)

//Join chatroom
socket.emit('joinRoom',{username,room})

//get room and users
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room)
    outputUsers(users)
})

//Message from server
socket.on('message',message=>{
    console.log(message)
    outputMessage(message)

    chatMessages.scrollTop=chatMessages.scrollHeight
})

//message submission
chatForm.addEventListener('submit',e=>{
    e.preventDefault()

    //get message text
    const msg=e.target.elements.msg.value

    //emit message to server
    socket.emit('chatmessage',msg)

    e.target.elements.msg.value=''
    e.target.elements.msg.focus()
})

function outputMessage(message){
    const div=document.createElement('div')
    div.classList.add('message')
    div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

//Add room name to DOM
function outputRoomName(room) {
    roomName.innerText=room
}

function outputUsers(users){
    userList.innerHTML=`${users.map(user=>`<li>${user.username}</li>`).join('')}`
}