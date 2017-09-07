let express = require('express')
let router = express.Router()
let Model = require('../models')

router.get('/', (req, res)=>{
  Model.Teacher.findAll()
  .then(dataTeacher => {
    // projects will be an array of all Project instances
    // res.send(data)
    //[{"id":1,"first_name":"Bambang","last_name":"Suprapto","email":"Bambang@gmail.com","createdAt":"2017-09-07T07:22:50.839Z","updatedAt":"2017-09-07T07:22:50.839Z"}]
    res.render('teacher', {dtTeacher:dataTeacher})
  })
  .catch((err)=>{
    res.send(err)
  })
})

module.exports = router
