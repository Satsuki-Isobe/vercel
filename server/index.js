const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const next = require('next')
const { SMTP } = require('./form')
const { CMS } = require('./cms')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const server = express()
const router = express.Router()

app.prepare().then(() => {
  server.use(bodyParser.json())
  server.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000}
  }))

  server.post('/send', async (req, res) => {
    const result = await SMTP(req, res)
    res.send(req.body)
  })

  server.get('/cms', async (req, res) => {
    const result = await CMS(req, res)
    res.send(result)
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if(err) throw err
    console.log((`> Ready to http:localhost:${port}`))
  })
})