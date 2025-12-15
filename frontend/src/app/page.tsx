'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

interface Task {
  id: string
  name: string
  status: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [health, setHealth] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [taskName, setTaskName] = useState('')
  const [createdTask, setCreatedTask] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthData, tasksData] = await Promise.all([
          api.getHealth(),
          api.getTasks(),
        ])
        setHealth(healthData)
        setTasks(tasksData.tasks)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!taskName.trim()) return

    try {
      const result = await api.createTask({
        name: taskName,
        description: 'Created from frontend',
      })
      setCreatedTask(result)
      setTaskName('')
      
      // Refresh tasks list
      const tasksData = await api.getTasks()
      setTasks(tasksData.tasks)
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  if (loading) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Loading...</h1>
      </main>
    )
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Guess the Model</h1>
      <p>Welcome to the Guess the Model application!</p>

      <section style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>API Health Status</h2>
        {health ? (
          <div>
            <p><strong>Status:</strong> {health.status}</p>
            {health.service && <p><strong>Service:</strong> {health.service}</p>}
          </div>
        ) : (
          <p>Unable to connect to backend</p>
        )}
      </section>

      <section style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Create Background Task</h2>
        <form onSubmit={handleCreateTask}>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            style={{ padding: '0.5rem', width: '300px', marginRight: '1rem' }}
          />
          <button 
            type="submit"
            style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            Create Task
          </button>
        </form>
        {createdTask && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <p><strong>Task Created!</strong></p>
            <p>Task ID: {createdTask.task_id}</p>
            <p>Status: {createdTask.status}</p>
          </div>
        )}
      </section>

      <section style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Tasks List</h2>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} style={{ marginBottom: '0.5rem' }}>
                <strong>{task.name}</strong> - Status: {task.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks found</p>
        )}
      </section>
    </main>
  )
}
