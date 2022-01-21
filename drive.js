
function createDrive(isFake) {
  if (isFake) {
    return {
      motors: {
        left: val => console.log('left', val),
        right: val => console.log('right', val)
      },
      off: () => console.log('off'),
      destroy: () => console.log('destroy')
    }
  }
  const { Gpio } = require('onoff')
  const standBy = new Gpio(17, 'out')
  const ain1 = new Gpio(26, 'out')
  const ain2 = new Gpio(19, 'out')
  const bin1 = new Gpio(16, 'out')
  const bin2 = new Gpio(20, 'out')

  standBy.writeSync(1)
  
  let destroyed = false

  return {
    motors: {
      left: val => {
        switch (val) {
          case 0:
            ain2.writeSync(0)
            ain1.writeSync(0)
            break
          case -1:
            ain1.writeSync(0)
            ain2.writeSync(1)
            break
          case 1:
            ain2.writeSync(0)
            ain1.writeSync(1)
            break
        }
      },
      right: val => {
        switch (val) {
          case 0:
            bin2.writeSync(0)
            bin1.writeSync(0)
            break
          case -1:
            bin1.writeSync(0)
            bin2.writeSync(1)
            break
          case 1:
            bin2.writeSync(0)
            bin1.writeSync(1)
            break
        }
      }
    },
    off: () => {
      ain1.writeSync(0)
      ain2.writeSync(0)
      bin1.writeSync(0)
      bin2.writeSync(0)
    },
    destroy: () => {
      if (destroyed) return
      destroyed = true
      standBy.unexport()
      ain1.unexport()
      ain2.unexport()
      bin1.unexport()
      bin2.unexport()
    }
  }
}

module.exports = {
  createDrive
}
