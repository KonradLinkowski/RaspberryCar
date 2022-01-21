const { host } = location
const websocket = new WebSocket('ws://' + host + '/car')

const actions = {
  'off': () => sendMessage({ type: 'off' }),
  'left-forward': () => sendMessage({ type: 'drive', motor: 'left', value: 1 }),
  'left-off': () => sendMessage({ type: 'drive', motor: 'left', value: 0 }),
  'left-backwards': () => sendMessage({ type: 'drive', motor: 'left', value: -1 }),
  'right-forward': () => sendMessage({ type: 'drive', motor: 'right', value: 1 }),
  'right-off': () => sendMessage({ type: 'drive', motor: 'right', value: 0 }),
  'right-backwards': () => sendMessage({ type: 'drive', motor: 'right', value: -1 }),
}

if(window.matchMedia("(pointer: coarse)").matches) {
  bindEvent('#left-forward', 'touchstart', 'left-forward')
  bindEvent('#left-forward', 'touchend', 'left-off')
  
  bindEvent('#left-backwards', 'touchstart', 'left-backwards')
  bindEvent('#left-backwards', 'touchend', 'left-off')

  bindEvent('#right-forward', 'touchstart', 'right-forward')
  bindEvent('#right-forward', 'touchend', 'right-off')

  bindEvent('#right-backwards', 'touchstart', 'right-backwards')
  bindEvent('#right-backwards', 'touchend', 'right-off')
} else {
  bindEvent('#left-forward', 'mousedown', 'left-forward')
  bindEvent('#left-forward', 'mouseup', 'left-off')


  bindEvent('#left-backwards', 'mousedown', 'left-backwards')
  bindEvent('#left-backwards', 'mouseup', 'left-off')
  
  
  bindEvent('#right-forward', 'mousedown', 'right-forward')
  bindEvent('#right-forward', 'mouseup', 'right-off')
  
  bindEvent('#right-backwards', 'mousedown', 'right-backwards')
  bindEvent('#right-backwards', 'mouseup', 'right-off')
}

document.querySelector('#off').addEventListener('click', actions['off'])

websocket.addEventListener('message', msg => {
  console.log(msg)
})

function sendMessage(data) {
  websocket.send(JSON.stringify(data))
}

function bindEvent(selector, event, action) {
  document.querySelector(selector).addEventListener(event, actions[action])
}
