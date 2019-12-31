// const mysql = require('mysql')
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'battleship',
// })

// module.exports = {
//   getHomePage: (req, res) => {
//     let query = 'SELECT * FROM `players` ORDER BY id ASC' // query database to get all the players

//     // execute query
//     db.query(query, (err, result) => {
//       if (err) {
//         res.redirect('/')
//       }
//       res.render('index.ejs', {
//         title: 'Welcome to Socka | View Players',
//         players: result,
//       })
//     })
//   },
// }
