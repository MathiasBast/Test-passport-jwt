require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const utils = require('./utils')

router.get('/', authenticateToken, (req, res) => {
  utils.getData('data', (err, data) => {
    if (err) return res.status(500).send(err.message)
    res.status(200).json(data)
  })
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

router.post('/login', (req, res) => {
  const username = req.body.username
  const user = { name: username }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken })
})

router.post('/:username/:password', (req, res) => {
  const { username, password } = req.params
  const data = {
    username,
    password
  }
  utils.addUser(data, 'data', (err, data) => {
    if (err) return res.status(500).send(err.message)
    res.status(200).json(data)
  })
})

module.exports = router
