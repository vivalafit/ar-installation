const express = require('express')
const app = express()

const server = require('http').Server(app)

app.set('view engine', 'ejs')
app.use(express.static('assets'))

app.get('/', (req, res) => {
  res.render('main');
})

app.get('/participants', (req, res) => {
  res.render('participants');
})

app.get('/concepts', (req, res) => {
  res.render('concepts');
})

server.listen(process.env.PORT|| 3000)
