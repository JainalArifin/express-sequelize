const express = require('express')
const router = express.Router()
const Model = require('../models')

router.use((req, res, next)=>{
  if(req.session.role === 'teacher' || req.session.role === 'academic' || req.session.role === 'headmaster' ){
    next()
  }else {
    res.send('anda bukan ketiganya')
  }
})

router.get('/', (req, res)=>{
  Model.Student.findAll({
    order:[['first_name', 'ASC']]
  })
  .then(dataStudent => {
    // res.send(dataStudent)
    console.log(dataStudent, ' <------ ini data student');
    res.render('student', {dtStudent:dataStudent, title:'Student'})
  })
  .catch((err) => {
    res.send(err)
  })
})

router.get('/add', (req, res)=>{
  // res.send('percobaan express')
  res.render('addStudent', {errEmail:''})
  // res.send('percobaan')
})

router.post('/', (req, res)=> {
  Model.Student.create({
    first_name:`${req.body.first_name}`,
    last_name:`${req.body.last_name}`,
    email:`${req.body.email}` })
  .then(task => {
    // console.log('test');
    // res.send(task)
    res.redirect('/student')
    // you can now access the newly created task via the variable task
  })
  .catch((err) => {
    // {"name":"SequelizeValidationError","errors":[{"message":"Validation isEmail on email failed","type":"Validation error","path":"email","value":"mkmkm","__raw":{}}]}
    //Validation error: Validation isEmail on email failed

    res.send(err.errors[0].message)
    // console.log(err.message, '<----------');
    // res.render('addStudent', {errEmail:err.message})
  })
})

router.get('/delete/:id', (req, res)=>{
  Model.Student.destroy({
    where: {
      id: `${req.params.id}` //this will be your id that you want to delete
    }
  })
  .then(task => {
    // console.log('test');
    // res.send(task)
    res.redirect('/student')
    // you can now access the newly created task via the variable task
  })
  .catch(() => {
    res.send(' anda salah')
  })
})


router.get('/edit/:id', (req, res)=>{
  Model.Student.findAll({
    where: {
      id: `${req.params.id}`
    }
  })
  .then((dataStudent) => {
    // res.send(value)
    res.render('editStudent', {dtStudent:dataStudent[0]} )
  })
})

router.post('/edit/:id', (req, res)=>{
  Model.Student.update({
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email}`
  },{
    where: {
      id: `${req.params.id}`
    }
  })
  .then(() => {
    res.redirect('/student')
  })
})

router.get('/:id/addSubject', (req, res)=>{
  Model.Student.findById(req.params.id)
  .then((dataStudent) => {
    Model.Subject.findAll()
    .then((dataSubject) => {
      // res.send(dataStudent)
      console.log(dataSubject, '<--------- data student');
      res.render('addStudentSubject', {dtStudent:dataStudent, dtSubject:dataSubject})
    })
  })
})

router.post('/:id/addSubject', (req, res)=>{
  Model.StudentSubject.create({
    StudentId: `${req.params.id}`,
    SubjectId: `${req.body.pilihSubject}`
  },{
    where: {
      id:`${req.params.id}`
    }
  })
  .then(() => {
    res.redirect('/student')
  })
  .catch((err) => {
    console.log(err);
  })
})


module.exports = router
