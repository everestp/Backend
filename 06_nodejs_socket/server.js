
const express = require('express')
const http = require('http')
const ws = require('socket.io')

const app =express()

const server =http.createServer(app)

//intiate the socket.io and attach this to the http server
const io = ws(server)

app.use(express.static('public')) 