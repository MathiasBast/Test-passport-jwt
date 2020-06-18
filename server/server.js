const path = require('path')
const express = require('express')
const passport = require('passport')

const server = express()

const user = require('./routes')

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(passport.initialize())

server.use('/api/v1/user', user)

module.exports = server
