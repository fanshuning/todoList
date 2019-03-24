import axios from 'axios'
const baseUrl =
process.env.NODE_ENV === 'development'
  ? 'http://localhost:8088'
  : 'https://nei.netease.com/api/apimock/05c2fd35a43f214d2bd64e4f56765fe6'

// 获取所有todo
export function getAllTodos () {
  return axios.get(`${baseUrl}/api/getAllTodos`)
}

// 新增todo
export function createTodo (params) {
  return axios.post(`${baseUrl}/api/createTodo`, params)
}

// delete todo
export function deleteTodo (params) {
  return axios.post(`${baseUrl}/api/delateTodo`, params)
}

// update todo
export function updateTodo (params) {
  return axios.post(`${baseUrl}/api/updateTodo`, params)
}
