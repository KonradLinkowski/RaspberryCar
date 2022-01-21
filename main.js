const express = require('express')
const app = express()
const { join } = require('path')
const { Gpio } = require('onoff')

const standBy = new Gpio(17, 'out')
const ain1 = new Gpio(19, 'out')
const ain2 = new Gpio(26, 'out')
const bin1 = new Gpio(16, 'out')
const bin2 = new Gpio(20, 'out')

app.get('/on', (req, res) => {
  standBy.writeSync(1)
  ain1.writeSync(1)
  bin2.writeSync(1)
  res.sendStatus('/')
})

app.get('/off', (req, res) => {
  standBy.writeSync(0)
  ain1.writeSync(0)
  bin2.writeSync(0)
  res.redirect('/')
})

app.use('/', express.static(join(__dirname, 'public')))

app.listen(3000, () => console.log('Server started'))

process.on('SIGINT', handleFailure)
process.on('beforeExit', handleFailure)
process.on('exit', handleFailure)

let handled = false
function handleFailure() {
  if (handled) return
  handled = true

  standBy.unexport()
  ain1.unexport()
  ain2.unexport()
  bin1.unexport()
  bin2.unexport()
}
