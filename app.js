'use strict'
// import swaggerUi from 'swagger-ui-express'
// import swaggerDocument from './swagger.json'

// Get dependencies
const express = require('express')
// const socket = require('socket.io')
const http = require('http')
// Swagger for Api Testing
const passport = require('./app/config/passport')
const app = express()

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Middleware to capture any HTTP responses

app.get('/api/v1/auth/health', function (req, res) {
  return res.status(200).send('Auth micro-service working 100%... \n 26 October, 2019 - 1:15 PM')
})

global.winston = require('./app/config/winston')

// Initialize Express
require('./app/config/express')(app, passport)

// Initializing sequelize
require('./app/config/sequelize.config')

// Initializing RabbitMQ Receiver on listening.
require('./app/config/rabbitMQ.config')
/**
     * Get port from environment and store in Express.
     */
const port = process.env.PORT || '3000'
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)
// const io = socket.listen(server)

// require('./app/config/socket.config')(io)

/**
 * Listen on provided port, on all network interfaces.
 */
console.log('Going to listen on port:', port)
server.listen(port, () => console.log(`API running on localhost:${port}`)).on('error', (error) => {
  console.log(error)
})



console.log('After listen on port:', port)

module.exports = app
