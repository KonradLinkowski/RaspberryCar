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

document.addEventListener('click', ({ target }) => {
  if (!target.dataset || !target.dataset.action) return
  if (!(target.dataset.action in actions)) return
  actions[target.dataset.action]()
}, false)

websocket.addEventListener('message', msg => {
  console.log(msg)
})

function sendMessage(data) {
  websocket.send(JSON.stringify(data))
}
