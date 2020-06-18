require('dotenv').config()
const express = require('express')
const router = express.Router()
const passport = require('passport')

const utils = require('./utils')

router.get('/', (req, res) => {
  utils.getData('data', (err, data) => {
    if (err) return res.status(500).send(err.message)
    res.status(200).json(data)
  })
})

router.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username)
  })

router.post('/register', (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    if (err) {
      console.error(err)
    }
    if (info !== undefined) {
      res.statusMessage = `${info.message}`
      res.status(403).end()
    } else {
      res.statusMessage = 'user created!'
      res.status(200).end()
    }
  })(req, res, next)
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
