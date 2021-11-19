
import React, { useState, useEffect } from 'react'
import Head from './head'
// import wave from '../assets/images/wave.jpg'
// <img alt="wave" src="images/wave.jpg" />
const Home = (props) => {
  const { initialMinute = 0, initialSeconds = 0 } = props
  const [minutes, setMinutes] = useState(initialMinute)
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(false)
  const [rounds, SetRounds] = useState('')

  useEffect(() => {
    const interval = setTimeout(() => {
      if (!isActive) {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearTimeout(interval)
          }
          else {
            setMinutes(minutes - 1)
            setSeconds(59)
            setIsActive(!isActive)
          }
        }
      }
    }, 1000)
    return () => {
      clearTimeout(interval)
    }
  }, [minutes, seconds, isActive,])
  return (
    <div>
      <Head title="Hello" />
      <div className="h-100 w-full flex items-center justify-center bg-black font-sans">
        <div className="bg-green-400 flex items-center justify-between rounded shadow p-6 m-4 w-full ">
          <input type="number" name="reps" required />


          <div>
            {minutes === 0 && seconds === 0
              ? null
              : <h1>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </h1>
            } </div>

          <button
            type="button"
            className="mt-3  sm:mt-0 py-10 px-5 md:py-3 md:px-6 h-12 bg-indigo-600 hover:bg-indigo-400 font-bold text-white rounded-lg shadow-md"
            onClick={() => {
              SetRounds([...rounds, { name: rounds, isDone: false, id: rounds.length }])
              setSeconds(rounds +1)
            }}
          >
            Round
          </button>
          <button
            type="button"
            className="mt-3  sm:mt-0 py-10 px-5 md:py-3 md:px-6 h-12 bg-indigo-600 hover:bg-indigo-400 font-bold text-white rounded-lg shadow-md"
            onClick={() => setMinutes(minutes + 1)}>
            + 1 min
          </button>
          <button
            type="button"
            className="mt-3 sm:mt-0 py-10 px-5 md:py-3 md:px-6 h-12 bg-indigo-600 hover:bg-indigo-400 font-bold text-white rounded-lg shadow-md"
            onClick={() => setSeconds(seconds - 10)}> - 10 sec
          </button>
          <button
            type="button"
            className="mt-3  sm:mt-0 py-10 px-5 md:py-3 md:px-6 h-12 bg-indigo-600 hover:bg-indigo-400 font-bold text-white rounded-lg shadow-md"
            onClick={() => setSeconds(seconds + 10)}> +10 sec
          </button>
          <button
            type="button"
            className="mt-3  sm:mt-0 py-10 px-5 md:py-3 md:px-6 h-12 bg-indigo-600 hover:bg-indigo-400 font-bold text-white rounded-lg shadow-md"
            onClick={() => {
              setMinutes(0);
              setSeconds(0);
            }}>Reset
          </button>
          <button
            type="button"
            className="mt-3  sm:mt-0 py-10 px-5 md:py-3 md:px-6 h-12 bg-indigo-600 hover:bg-indigo-400 font-bold text-white rounded-lg shadow-md"
            onClick={() => setIsActive(!isActive)} >
            {isActive ? "Start" : "Pause"}
          </button>

        </div>
      </div>
    </div>
  )
}



Home.propTypes = {}

export default Home
