const socket=io()
const chatForm=document.getElementById('chat-form')
const chatMessages=document.querySelector('.chat-messages')


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