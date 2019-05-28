import api from '.'

async function start () {
  return api.post('/control', { command: 'start' })
}

async function pause () {
  return api.post('/control', { command: 'pause' })
}

async function test () {
  return api.get('/control')
}

async function direction (direction) {
  return api.post('/control', { command: direction })
}

async function reset () {
  return api.post('/control', { command: 'reset' })
}

export {
  start,
  pause,
  direction,
  reset,
  test
}
