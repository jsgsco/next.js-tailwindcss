import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useTask } from "../context/TaskContext";
import { useRouter } from 'next/router';

const TaskFormPage = () => {

    const { createTask, editTask, tasks } = useTask()
    const router = useRouter()

    const [task, setTask] = useState({
        title: '',
        description: ''
    })

    const handleChange = e => {
        setTask({...task, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(!router.query.id) {
            createTask(task.title, task.description)
        } else {
            editTask(router.query.id, task)
        }

        router.push('/')
    }

    useEffect(() => {
      if(router.query.id) {
        const taskFound = tasks.find(task => task.id === router.query.id)
        setTask({ title: taskFound.title, description: taskFound.description })
      }
    }, [])

    return ( 
        <Layout>
            <form onSubmit={ handleSubmit }>
                <h1>{router.query.id ? 'Update a Task' : 'Add a Task'}</h1>
                <input 
                    type="text" 
                    name="title"
                    placeholder="Write a Title" 
                    className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
                    onChange={ handleChange }
                    value={task.title}
                />
                <textarea 
                    rows="2" 
                    name="description"
                    placeholder="Write a Description"
                    className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
                    onChange={ handleChange }
                    value={task.description}
                ></textarea>

                <button
                    className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-30"
                    disabled={!task.title}
                >Save</button>
            </form>
        </Layout>
     );
}
 
export default TaskFormPage;