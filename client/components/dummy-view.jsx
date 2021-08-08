import React, {useState} from 'react'
import Head from './head'

const Dummy = () => {
  const [newTaskName, setNewTaskName] = useState('')
  const [tasks, setTasks] = useState([])
  return (
   <div>
     <Head title="Hello" />
    <div className="h-100 w-full flex items-center justify-center bg-green font-sans">
      <div className="bg-green-400 rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-black">My TaskList</h1>
          <div className="flex mt-4">
          <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-blue-200"
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
                  setTasks([...tasks, { name: newTaskName, isDone: false, id: tasks.length }])
                  setNewTaskName('')
                }}
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
                      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
                      onClick={() => {
                        setTasks(
                          tasks.map((taskClicked) => {
                            if (taskClicked.id !== task.id) return taskClicked
                            return {
                              ...taskClicked,
                              isDone: true
                            }
                          })
                        )
                      }}
                    >
                      Done
                    </button>
                  )}
                  <button
                    type="button"
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                    onClick={() => {
                      setTasks(tasks.filter((taskClicked) => taskClicked.id !== task.id))
                    }}
                  >
                    Remove
                  </button>
                </div>
              )})}
          </div>
        </div>
      </div>
    </div>
  )}

Dummy.propTypes = {}

export default React.memo(Dummy)
