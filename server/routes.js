const express = require('express')
const router = express.Router()

const utils = require('./utils')

router.get('/', (req, res) => {
  utils.getData('data', (err, data) => {
    if (err) return res.status(500).send(err.message)
    res.status(200).json(data)
  })
})

router.post('/:username/:password', (req, res) => {
  const { username, password } = req.params
  const data = {
    username,
    password
  }
  utils.addUser(data, 'data', (err, data) => {
    if (err) return res.status(500).send(err.message)
    console.log(data)
    res.status(200).json(data)
  })
})

module.exports = router
