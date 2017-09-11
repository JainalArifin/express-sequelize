let express = require('express')
let router = express.Router()
let Model = require('../models')

router.get('/', (req, res)=>{
  Model.Teacher.findAll({
    order:[['first_name', 'ASC']],
    include: [Model.Subject]
  })
  .then(dataTeacher => {

    // console.log(dataTeacher, '<------- ini data teacher');
    // res.send(dataTeacher)
    res.render('teacher', {dtTeacher:dataTeacher, title:'Teacher'})
  })
})

router.get('/add', (req, res)=>{
  // res.send('Percobaan')
  res.render('addTeacher', {errEmail:'', title:'Teacher'} )
})

router.post('/', (req, res)=>{
  Model.Teacher.create({
    first_name:`${req.body.first_name}`,
    last_name:`${req.body.last_name}`,
    email:`${req.body.email}`
  })
  .then(() => {
    res.redirect('/teacher')
  })
  .catch(() => {
    // console.log('percobaan email');
    res.render('addTeacher', {errEmail: 'Format email salah atau email sudah di Gunakan', title:'Teacher'})
  })
})

router.get('/delete/:id', (req, res)=>{
  Model.Teacher.destroy({
    where: {
      id: `${req.params.id}`
    }
  })
  .then(() => {
    res.redirect('/teacher')
  })
})

router.get('/edit/:id', (req, res)=>{
  Model.Teacher.findAll({
    include: [Model.Subject],
    where: {
      id: `${req.params.id}`
    }
  })
  .then((dataTeacher) => {
    // res.send(dataTeacher)
    Model.Subject.findAll()
    .then((dataSubject) => {

      // console.log(dataSubject[2], '<--------ini data subject untuk mendapatkan ID');
      for (var i = 0; i < dataSubject.length; i++) {
        console.log(dataSubject[i] );
      }

      res.render('editTeacher', {dtTeacher:dataTeacher[0], dtSubject:dataSubject})
    })
  })
})

router.post('/edit/:id', (req, res)=>{
  Model.Teacher.update({
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email}`,
    SubjectId: `${req.body.SubjectId}`
  },{
    where:{ id:`${req.params.id}` }
  })
  .then(() => {
    res.redirect('/teacher')
  })
  .catch((err) => {
    console.log(err);
  })
})


module.exports = router
