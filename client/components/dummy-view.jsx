
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Head from './head'

const Dummy = () => {
  const [newTaskName, setNewTaskName] = useState('')
  const [tasks, setTasks] = useState([])


  useEffect(() => {
    axios.get('/api/task').then((response) => {
      setTasks(response.data.tasks)
    })
  }, [])

  const addTask = (name) => {
    axios
      .post('/api/tasks', {
        name,
        isDone: false
      }).then((response) => {
        console.log(response.data)
        setTasks(response.data.tasks);


      });
  }


  const delTask = (id) => {
    axios
      .delete(`/api/task/${id}`, {
        id,
      })
      .then((response) =>
        setTasks(response.data.tasks));
  };

  const updateTask = (id) => {
    axios
      .put(`/api/task/${id}`, {
        id,
        isDone: true
      })
      .then((response) =>
        setTasks(response.data.task))
  }



  return (
    <div>
      <Head title="Hello" />
      <div className="h-100 w-full flex items-center justify-center bg-green font-sans">
        <div className="bg-green-400 rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-black">My TaskList </h1>
            <div className="flex mt-4">

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-blue-700"
                placeholder="Add Todo"
                value={newTaskName}
                onChange={(e) => {
                  setNewTaskName(e.target.value)
                }}
              />


              <button
                type="button"
                className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
                onClick={() => {
                  addTask(newTaskName)
                  setTasks([...tasks, { name: newTaskName, isDone: false, id: tasks.length }])
                  setNewTaskName('')
                }
                }
              >
                Add
              </button>

            </div>
          </div>
          <div>
            {tasks.map((task) => {
              return (
                <div key={task.id} className="flex mb-4 items-center">
                  <p className="w-full text-grey-darkest">
                    {task.isDone && 'Done'}
                    {task.name}
                  </p>
                  {!task.isDone && (

                    <button
                      type="button"
                      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded  hover:text-white text-green border-green hover:bg-green"
                      onClick={() => {
                        updateTask(task.id)

                         /* setTasks(
                           tasks.map((taskClicked) => { 
                             if (taskClicked.id !== task.id) return taskClicked
                             return { 
                               ...taskClicked,
                               isDone: true,
                             }
                           }) 
                         ) */

                      }}

                    >
                      Done
                    </button>
                  )}

                  <button
                    type="button"
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                    onClick={() => {
                      delTask(task.id)
                      setTasks(tasks.filter((taskClicked) => taskClicked.id !== task.id))

                    }}
                  >
                    Remove
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
