const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send({ response: 'dummy socket.io connect point' }).status(200)
})

module.exports = router 