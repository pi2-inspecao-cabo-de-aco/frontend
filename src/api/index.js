import axios from 'axios'

console.log('ROBOT_URL', process.env.ROBOT_URL)

let robotApi = axios.create({
  baseURL: process.env.ROBOT_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

console.log('NET_API_URL', process.env.NET_API_URL)

let netApi = axios.create({
  baseURL: process.env.NET_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export {
  robotApi,
  netApi
}
