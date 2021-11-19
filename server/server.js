import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

require('colors')

let Root
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

const fs = require('fs/promises')

let taskList = []
 fs.readFile(`${__dirname}/tasks.json`).then((tasks) => {
 taskList = JSON.parse(tasks)
}) ; 



server.get('/api/task',async (req, res) => {
  return res.status(200).json({
    tasks: taskList
  })
});

server.post('/api/tasks',async (req, res) => {
  if (!req.body.name) {
    return res.status(200).json({
      addTask: ['Task has been added successfully'],
      tasks: taskList
    });
  }
  const task = {
    id: taskList.length + 1,
    isDone: req.body.isDone,
    name: req.body.name,
  };
  taskList = [...taskList, task]
  await fs.writeFile(`${__dirname}/tasks.json`, JSON.stringify(taskList))
  return res.status(201).json({
    message: 'Task has been added successfully',
    tasks: taskList
  })
});

server.delete('/api/task/:id',async (req, res) => {
  if (!req.params.id) {
    return res.status(200).json({
      delTask: 'Task has been deleted successfully',

    });
  }
  const taskId = Number(req.params.id)
  const tasks = taskList.filter((task) => {
    return task.id !== taskId
  });
  taskList = tasks;
  await fs.writeFile(`${__dirname}/tasks.json`, JSON.stringify(tasks))
  return res.status(200).json({
    tasks,
  });
})

server.put('/api/task/:id',async (req, res) => {
  const newTaskId = +req.params.id;
  taskList = taskList.map((oldTask) => {
    return oldTask.id === newTaskId ? { ...oldTask, isDone: true } : oldTask
  })
  await fs.writeFile(`${__dirname}/tasks.json`, JSON.stringify(taskList))
  return res.status(200).json({
    task: taskList,
    isDone: true

  })
});


const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => { })

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
