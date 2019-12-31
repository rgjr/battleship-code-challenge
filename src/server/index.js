const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const mysql = require('mysql')

// Create express instance
const app = express()
const server = new http.Server(app)

app.use(express.static('../build'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Create connection to db
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'battleship',
})

// Connect to database
db.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the DB')
    throw err
  }

  console.log('Connected to database!')
})

/**
 * API
 **/

// Example Response
app.get('/api/getList', (req, res) => {
  const list = ['item1', 'item2', 'item3']
  res.json(list)
})

/**
 * GET
 */

// GET Players
app.get('/api/getPlayers', (req, res) => {
  const query = 'SELECT * FROM `players` ORDER BY id ASC'

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.send(`mysql failed to connect ${err}`)
    } else if (result.length === 0) {
      return res.send({
        error: 'No Players exist.',
      })
    }

    res.send({
      players: result,
    })
  })
})

/**
 * POST
 */

// Create Players
app.post('/api/createPlayers', (req, res) => {
  const query = "INSERT INTO players (name) VALUES ('One')"

  db.query(query, function(err, result) {
    if (err) throw err

    res.send({
      message: result,
    })
  })
})

// Create 10x10 Grid
app.post('/api/game/createBoard', (req, res) => {
  const query = "INSERT INTO players (name) VALUES ('One')"

  db.query(query, function(err, result) {
    if (err) throw err

    res.send({
      message: result,
    })
  })
})

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../build/index.html'))
})

/**
 * Start
 */

const port = process.env.PORT || 8001

server.listen(port, () => {
  console.log(`Started http server on ${port}`)
})
