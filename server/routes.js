if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const utils = require('./utils')
const jwtSecret = process.env.SECRET_KEY

router.get('/', (req, res) => {
  utils.getData('data', (err, data) => {
    if (err) return res.status(500).send(err.message)
    res.status(200).json(data)
  })
})

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, users, info) => {
    if (err) {
      console.error(`error ${err}`)
    }
    if (info !== undefined) {
      console.log('login error ', info.message)
      res.statusMessage = `${info.message}`
      if (info.message === 'bad username') {
        res.status(401).end()
      } else {
        res.status(403).end()
      }
    } else {
      utils.findUser(req.body.username, (err, user) => {
        if (err) res.status(403)
        const token = jwt.sign({ id: user.id }, jwtSecret, {
          expiresIn: 60 * 60
        })
        res.status(200).send({
          auth: true,
          token,
          message: 'user found & logged in'
        })
      })
    }
  })(req, res, next)
})

router.post('/register', (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    if (err) {
      console.error(err)
    }
    if (info !== undefined) {
      res.statusMessage = `${info.message}`
      res.status(403).send({ message: info.message }).end()
    } else {
      res.statusMessage = 'user created!'
      res.status(200).end()
    }
  })(req, res, next)
})

module.exports = router
