
const express = require('express')
const http = require('http')
const ws = require('socket.io')

const app =express()

const server =http.createServer(app)

//intiate the socket.io and attach this to the http server
const io = ws(server)

app.use(express.static('public')) 

const users = new Set()

io.on('connection',(socket)=>{
 console.log('A user is now connected')
//handle users when  they will join
socket.on('join',(userName)=>{
users.add(userName)

//broadcast to all client/users that a user has joined
io.emit('userJoined',userName);

//send the updated user list to all client
io.emit('userList',Array.from(users))
})


//handle incoming chat message

//handle user disconnection


})


app.listen(3001,()=>{
    console.log("Server is running at port 3000")
})