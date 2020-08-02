const users=[]

//join
function userJoin(id,username,room){
    const user={id,username,room}

    users.push(user)

    return user
}

//get current user
function getCurrentUSer(id){
    return users.find(user=>user.id===id)
}

module.exports={
    userJoin,
    getCurrentUSer
}