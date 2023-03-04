const express = require('express')
const app = express()

const server = require('http').Server(app)

app.set('view engine', 'ejs')
app.use(express.static('assets'))

app.get('/', (req, res) => {
  res.render('demo', { roomId: req.params.room })
})

server.listen(process.env.PORT|| 3000)
