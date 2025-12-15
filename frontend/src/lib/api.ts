import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  // Health check
  async getHealth() {
    const response = await apiClient.get('/api/health')
    return response.data
  },

  // Get all tasks
  async getTasks() {
    const response = await apiClient.get('/api/tasks')
    return response.data
  },

  // Create a new task
  async createTask(data: { name: string; description?: string }) {
    const response = await apiClient.post('/api/tasks', data)
    return response.data
  },

  // Get task status
  async getTaskStatus(taskId: string) {
    const response = await apiClient.get(`/api/tasks/${taskId}`)
    return response.data
  },
}
