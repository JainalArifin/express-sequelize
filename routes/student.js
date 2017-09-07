const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res)=>{
  Model.Student.findAll()
  .then(dataStudent => {
    // res.send(dataStudent)
    // console.log(dataStudent, ' <------ ini data student');
    res.render('student', {dtStudent:dataStudent})
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
    last_name:`${req.body.first_name}`,
    email:`${req.body.email}` })
  .then(task => {
    // console.log('test');
    // res.send(task)
    res.redirect('/student')
    // you can now access the newly created task via the variable task
  })
  .catch(() => {
    // res.send(err.message)
    res.render('addStudent', {errEmail: 'Format email salah atau email sudah di Gunakan'})
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

module.exports = router
