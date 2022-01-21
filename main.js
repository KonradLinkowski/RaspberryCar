const express = require('express')
const app = express()
require('express-ws')(app)
const { join } = require('path')
const { createDrive } = require('./drive')

const { motors, off, destroy } = createDrive(!process.env.NODE_ENV)

app.ws('/car', (ws) => {
  ws.on('message', (msg) => {
    const { type, ...args } = JSON.parse(msg)
    switch (type) {
      case 'off':
        off()
        break
      case 'drive':
        const { motor, value } = args
        motors[motor](value)
        break
    }
  })
})

app.use('/', express.static(join(__dirname, 'public')))

app.listen(3000, () => console.log('Server started'))

process.on('SIGINT', handleExit)
process.on('exit', handleExit)

function handleExit() {
  destroy()
  process.exit()
}
