const path = require('path')
const express = require('express')
const passport = require('passport')

const server = express()

require('./config/passport')
const user = require('./routes')

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(passport.initialize())

server.use('/api/v1/user', user)

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

module.exports = server
