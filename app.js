const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const index = require('./routes/index.js')
const teacher = require('./routes/teacher.js')
const subject = require('./routes/subject.js')
const student = require('./routes/student.js')

app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())


app.use('/', index)
app.use('/teacher', teacher)
app.use('/subject', subject)
app.use('/student', student)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
