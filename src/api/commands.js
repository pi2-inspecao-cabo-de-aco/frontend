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

export {
  start,
  pause,
  test
}
