import { createContext, useContext, useState } from 'react';

const TaskContext = createContext()

export const useTask = () => useContext(TaskContext)

export const TaskProvider = ({children}) => {

    const [tasks, setTasks] = useState([{id: '1', title: 'first task', description: 'some' }])

    const createTask = (title, description) => {
        setTasks([
            ...tasks,
            { id: Math.floor(Math.random() * 100).toString() , title, description }
        ])
    }

    const editTask = (id, updateTask) => {
        setTasks([
            ...tasks.map(task => task.id === id ? { ...task, ...updateTask } : task)
        ])
    }

    const deleteTask = id => setTasks([...tasks.filter(task => task.id !== id)])

    return <TaskContext.Provider value={{
        tasks,
        createTask,
        editTask, 
        deleteTask
    }}>{children}</TaskContext.Provider>
}