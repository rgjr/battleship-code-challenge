const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const col = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

/***************************************
 * SETUP
 ***************************************/

// Create express instance
const app = express()
const server = new http.Server(app)

app.use(express.static('../build'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/***************************************
 * DB CONNECTION
 ***************************************/

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

/***************************************
 * API
 ***************************************/

/*****
 * GET
 ****/

 // Example Get Response
app.get('/api/getList', (req, res) => {
  const list = ['item1', 'item2', 'item3']
  res.json(list)
})

// GET Players
app.get('/api/game/players/:id', (req, res) => {
  const query = `SELECT * FROM players WHERE id=${req.params.id}`

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
      player: result,
    })
  })
})

// GET Boards
app.get('/api/game/board/:name', (req, res) => {
  const name = req.params.name

  const query = `SELECT * FROM ${name}`

  db.query(query, (err, result) => {
    if (err) {
      res.send(`mysql failed to connect ${err}`)
    } else if (result.length === 0) {
      return res.send({
        error: 'No boards exist.',
      })
    }

    res.send({
      name,
      data: result
    })
  })
})

// GET board row
app.get('/api/game/board/:name/:row', (req, res) => {
  const name = req.params.name
  const row = req.params.row

  const query = `SELECT * FROM ${name}`

  db.query(query, (err, result) => {
    if (err) {
      res.send(`mysql failed to connect ${err}`)
    } else if (result.length === 0) {
      return res.send({
        error: 'No boards exist.',
      })
    }

    res.send({
      name,
      data: result[row],
    })
  })
})

// GET cell
app.get('/api/game/board/:name/:row/:cell', (req, res) => {
  const name = req.params.name
  const row = req.params.row
  const cell = req.params.cell

  const query = `SELECT * FROM ${name}`

  db.query(query, (err, result) => {
    if (err) {
      res.send(`mysql failed to connect ${err}`)
    } else if (result.length === 0) {
      return res.send({
        error: 'No boards exist.',
      })
    }

    res.send({
      name,
      data: result[row][cell],
    })
  })
})

/*****
 * POST
 *****/

// Example POST: Create Players
app.post('/api/createPlayers/', (req, res) => {
  const name = req.body.name
  // Name field in db is VARCHAR, quotes are necessary to convert from string
  const query = `INSERT INTO players(name) VALUES ("${name}")`

  db.query(query, function(err, result) {
    if (err) throw err

    res.send({
      message: result,
    })
  })
})

// Reset board data
/***
 * {Board} will be dropped first
 * {Board} will be recreated
 * {Board} will then have rows and columns autofilled with 0 as values
 */
app.post('/api/board/:name/reset', (req, res) => {
  const name = req.params.name
  const delete_query = `DROP TABLE IF EXISTS ${name}`
  const create_query = `CREATE TABLE IF NOT EXISTS ${name} (
    id int(11) unsigned NOT NULL AUTO_INCREMENT,
    A int(11) DEFAULT '0',
    B int(11) DEFAULT '0',
    C int(11) DEFAULT '0',
    D int(11) DEFAULT '0',
    E int(11) DEFAULT '0',
    F int(11) DEFAULT '0',
    G int(11) DEFAULT '0',
    H int(11) DEFAULT '0',
    I int(11) DEFAULT '0',
    J int(11) DEFAULT '0',
    PRIMARY KEY (id)
  )`

  async function reset() {
    let results = []


    let delete_board = await db.query(delete_query, (err, result) => {
      if (err) throw err
      results.push(result)
    })

    let create_board = await db.query(create_query, (err, result) => {
      if (err) throw err
      results.push(result)
    })

    let insert_values

    for(let i = 0; i < 10; i++) {
      insert_values = await db.query(`INSERT INTO ${name}(id) VALUES (${i + 1})`, (err, result) => {
        if (err) throw err
        results.push(result)
      })
    }
  }

  reset().then(result => {
    res.send(result)
  })
})

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../build/index.html'))
})

/***************************************
 * START SERVER
 ***************************************/

const port = process.env.PORT || 8001

server.listen(port, () => {
  console.log(`Started http server on ${port}`)
})
