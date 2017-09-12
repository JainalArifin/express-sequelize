const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

const index = require('./routes/index.js')
const teacher = require('./routes/teacher.js')
const subject = require('./routes/subject.js')
const student = require('./routes/student.js')
const login = require('./routes/login')
const dassboard = require('./routes/dasboard')

app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

app.use(session({
  secret: 'warung-coding',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))


app.use('/', index)
app.use('/login', login)
app.use('/dasboard', dassboard)
app.use('/teacher', teacher)
app.use('/subject', subject)
app.use('/student', student)

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
