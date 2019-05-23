import axios from 'axios'

console.log(process.env.ROBOT_URL)

export default axios.create({
  baseURL: process.env.ROBOT_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
