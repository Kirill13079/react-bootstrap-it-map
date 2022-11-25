const express = require('express')
const path = require('path')
const fs = require('fs')
const { nextTick } = require('process')

const app = express()
const port = process.env.PORT || 5000

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

require('./routes')(app)

app.listen(port, (err) => {
  if (err) {
    return console.log(err.message)
  }

  console.log(`Server running on port ${port}`)
})
