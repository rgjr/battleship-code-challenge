const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const index = require('./routes/index')
const tables = ['p1_board', 'p1_enemy_board', 'p2_board', 'p2_enemy_board']

/***************************************
 * SETUP
 ***************************************/

// Create express instance
const app = express()
const server = new http.Server(app)

app.use(index)
app.use(express.static('../build'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/***************************************
 * SOCKET.IO
 ***************************************/
const io = require('socket.io')(server, { transports: ['websocket'] }).listen(server)

/**
 * The .on() method takes two arguments:
 *    - the name of the event (ex. 'connect')
 *    - a callback that is executed after every 'connect' event
 * */
io.on('connect', socket => {
  socket.on('connect', message => {
    // io.sockets.emit('connect', 'test')
    socket.emit('connect', message)
  })

  socket.on('connection', message => {
    console.log(message)
    socket.emit('connection', message)
    // socket.emit('connection', ['can you hear me?', 1, 2, 'abc'])
  })

  socket.on('disconnect', message => {
    console.log(server)
    console.log(`Client disconnected [id=${socket.id}] `)
    socket.emit('connection', message)
    // socket.emit('connection', ['can you hear me?', 1, 2, 'abc'])
  })

  // socket.on('disconnect', () => console.log(`Client disconnected [id=${socket.id}] `))
})

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
      data: result,
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

// GET Ships
app.get('/api/game/ships', (req, res) => {
  const query = `SELECT * FROM ships`

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.send(`mysql failed to connect ${err}`)
    } else if (result.length === 0) {
      return res.send({
        error: 'No ships exist.',
      })
    }

    res.send({
      ships: result,
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
 * NOTE: Really ugly but it gets the job done
 */
app.post('/api/game/board/setup', (req, res) => {
  const name = req.params.name
  let delete_query, delete_boards
  let create_query, create_boards
  let insert_values

  async function reset() {
    let results = []

    for (let i = 0; i < tables.length; i++) {
      delete_query = `DROP TABLE IF EXISTS ${tables[i]}`
      create_query = `CREATE TABLE IF NOT EXISTS ${tables[i]} (
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

      delete_boards = await db.query(delete_query, (err, result) => {
        if (err) throw err

        results.push(result)
      })

      create_boards = await db.query(create_query, (err, result) => {
        if (err) throw err

        results.push(result)
      })
    }

    // TODO: Change to arr.forEach()?
    for (let i = 0; i < tables.length; i++) {
      for (let j = 0; j < 10; j++) {
        insert_values = await db.query(
          `INSERT INTO ${tables[i]}(id) VALUES (${j + 1})`,
          (err, result) => {
            if (err) throw err

            results.push(result)
          },
        )
      }
    }
  }

  reset().then(result => {
    res.send(result)
  })
})

// Randomize ship placement
app.post('/api/game/ships/:id', (req, res) => {
  async function data() {
    // Randomize horizontal or vertical
    const direction = ['horizontal', 'vertical']
    const random_direction = direction[Math.floor(Math.random() * direction.length)]

    // Return ship info for location and placement
    const ship = await db.query(`SELECT * FROM ships WHERE id='${req.params.id}'`, function(
      err,
      result,
    ) {
      if (err) throw err

      // Still need to set up placement of ships on game board
      res.send({
        directon: random_direction,
        ship: result,
      })
    })
  }

  data().catch(error => console.error)
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

// setInterval(() => {
//   let result = client.emit('connect', (response) => response)

//   console.log('RESULT: ', result)

//   console.log(client.connected)
// }, 3000)
