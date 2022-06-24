import { create } from 'apisauce'

const api = create({
  baseURL: 'http://127.0.0.1:8080/',
  timeout: 1000,
})

export const setToken = (token: string) => api.setHeader('Authorization', token)

export default api
