const { Gpio } = require('onoff')

const standBy = new Gpio(17, 'out')
const ain1 = new Gpio(19, 'out')
const ain2 = new Gpio(26, 'out')
const bin1 = new Gpio(16, 'out')
const bin2 = new Gpio(20, 'out')

standBy.writeSync(1)
ain1.writeSync(1)
bin2.writeSync(1)

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
