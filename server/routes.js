const express = require('express')
const router = express.Router()

const utils = require('./utils')

router.post('/', (req, res) => {
  console.log(req.body)
  res.sendStatus(202)
})

module.exports = router
