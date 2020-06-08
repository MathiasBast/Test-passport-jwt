const express = require('express')
const router = express.Router()

const utils = require('./utils')

router.get('/:username/:password', (req, res) => {
  const { username, password } = req.params
  console.log(username, password)
  utils.getData('data', (err, data) => {
    if (err) return res.status(500).send(err.message)
    res.status(200).json(data)
  })
})

module.exports = router
