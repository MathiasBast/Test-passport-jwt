const bcrypt = require('bcrypt')
// const db = require('../db/db')
const utils = require('../utils')

const jwtSecret = process.env.SECRET_KEY
const BCRYPT_SALT_ROUNDS = 12

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
require('dotenv').config()

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
      session: false
    },
    (req, username, password, done) => {
      try {
        utils.findUser(username, (err, resp) => {
          if (err) {
            return done(null, false, {
              message: err.message
            })
          }
          if (!resp.res) {
            return done(null, false, {
              message: 'username already taken'
            })
          }
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
            utils.addUser({
              username,
              password: hashedPassword
            }, (err, respo) => {
              if (err) {
                return done(null, false, {
                  message: err.message
                })
              }
              const user = { username, password: hashedPassword }
              console.log('user created')
              return done(null, user)
            })
          })
        })
      } catch (err) {
        return done(err)
      }
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false
    },
    (username, password, done) => {
      try {
        utils.findUser(username, (err, resp) => {
          if (err) return done(null, false, { message: 'incorrect username or password' })
          if (resp.res) return done(null, false, { message: 'incorrect username or password' })
          else {
            bcrypt.compare(password, resp.user.password).then(response => {
              if (response !== true) {
                console.log('passwords do not match')
                return done(null, false, { message: 'incorrect username or password' })
              }
              console.log('user found & authenticated')
              return done(null, resp.user)
            })
          }
        })
      } catch (err) {
        done(err)
      }
    }
  )
)

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwtPayload, done) => {
    try {
      utils.findUserById(jwtPayload.id, (err, res) => {
        // eslint-disable-next-line no-console
        if (err) console.log(err)
        if (res === false) {
          console.log('user not found in db')
          done(null, false)
        } else {
          console.log('user is authorized for next action ', res.username)
          done(null, res)
        }
      })
    } catch (err) {
      done(err)
    }
  })
)
