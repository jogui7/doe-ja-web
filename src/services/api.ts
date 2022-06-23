import { create } from 'apisauce'

const api = create({
  baseURL: 'http://localhost:8080/',
  timeout: 1000,
})

export const setToken = (token: string) => api.setHeader('Authorization', token)

export default api
