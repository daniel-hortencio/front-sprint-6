/* eslint-disable @typescript-eslint/no-var-requires */
const jsonServer = require('json-server')

// const middlewares = jsonServer.defaults()
const server = jsonServer.create()
const router = jsonServer.router('db.json')

// server.use(middlewares)
server.use(router)
server.listen(3333, () => {
  console.log('Backend is running on port 3333')
})

server.get('/autos', (req, res) => {
  console.log({ message: "Text" })
})