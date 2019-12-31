const path = require('path')

// Point to client <App />
global.appRoot = path.resolve(__dirname)

require('./client/index.js')
