import axios from 'axios'

const apiToken = '1|R5VNrFZLxX4z0EIvX8oCSATtq8I6sZ4ZDdCp5oNl9682bc0c'

const todoApi = axios.create({
  baseURL: 'http://localhost/api/v1',
  headers: {
    'Authorization': 'Bearer ' + apiToken
  }
})

export { todoApi }