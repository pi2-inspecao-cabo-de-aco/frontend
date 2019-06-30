import { robotApi } from '.'

async function start () {
  return robotApi.post('/control', { command: 'start' })
}

async function pause () {
  return robotApi.post('/control', { command: 'pause' })
}

async function test () {
  return robotApi.get('/control')
}

async function direction (direction) {
  return robotApi.post('/control', { command: direction })
}

async function reset () {
  return robotApi.post('/control', { command: 'reset' })
}

export {
  start,
  pause,
  direction,
  reset,
  test
}
