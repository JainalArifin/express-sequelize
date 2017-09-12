const express = require('express')
const router = express.Router()
const Model = require('../models')
const helper = require('../helpers/helper-score')

router.use((req, res, next)=>{
  if(req.session.role === 'academic' || req.session.role === 'headmaster' ){
    next()
  }else {
    res.send('anda bukan academic dan headmaster')
  }
})

router.get('/', (req, res)=>{
  Model.Subject.findAll({
    order:[['subject_name', 'ASC']],
    include: [Model.Teacher]
  })
  .then(dataSubject => {
    // console.log(dataSubject, '<------ ini data subject')
    //[{"id":1,"subject_name":"kimia","createdAt":"2017-09-07T07:36:27.177Z","updatedAt":"2017-09-07T07:36:27.177Z"},{"id":2,"subject_name":"Ekonomi","createdAt":"2017-09-07T07:36:27.177Z","updatedAt":"2017-09-07T07:36:27.177Z"}]
    // console.log(dataSubject[1].Teachers, '<-----ini data subject teacher');
    res.render('subject', {dtSubject:dataSubject, title:'Subject'})
    // projects will be an array of all Project instances
  })
  .catch((err) => {
    res.send(err)
  })
})

router.get('/add', (req, res)=>{
  res.render('addSubject')
})

router.post('/', (req, res)=> {
  Model.Subject.create({
    subject_name: `${req.body.subject_name}`
  })
  .then(() => {
    res.redirect('/subject')
  })
  .catch((err) => {
    console.log(err);
  })
})

router.get('/:id/enrolledstudents', (req, res)=>{
  Model.StudentSubject.findAll({
    // order:{{Student['first_name', 'ASC']}},
    where: {
      SubjectId: `${req.params.id}`
    },
    include: [{all:true}]
  })
  .then((dataSubjectStudent) => {

    console.log(dataSubjectStudent, '<---------- in data subject !!!');
    //[{"StudentId":50,"SubjectId":2,"createdAt":"2017-09-09T17:56:28.066Z","updatedAt":"2017-09-09T17:56:28.066Z","Student":{"id":50,"first_name":"zainal","last_name":"arif","email":"zainalunapam05@gmail.com","createdAt":"2017-09-08T08:29:51.148Z","updatedAt":"2017-09-08T08:29:51.148Z"},"Subject":{"id":2,"subject_name":"Ekonomi","createdAt":"2017-09-07T07:36:27.177Z","updatedAt":"2017-09-07T07:36:27.177Z"}}]
    if(dataSubjectStudent[0].Subject.subject_name == null){
      res.send('data belum ada')
    }else {
      res.render('subjectEnrolledStudents', {dtSubjectStudent:dataSubjectStudent,  helper:helper})
    }

  })
  .catch((err) => {
    res.send('Data belum ada')
  })
})

router.get('/:id/:ids/givescore', (req, res)=>{
  Model.Subject.findAll({
    where: {
      id: `${req.params.ids}`
    }
  })
  .then((dataSubject) => {
    Model.Student.findAll({
      where: {
        id: `${req.params.id}`
      }
    })
    // console.log(dataSubject, '<------ data subject yang baru');
    .then((dataStudent) => {
      // console.log(dataSubject, '<---------- data subject');
      res.render('subjectGiveScore', {dtStudent:dataStudent[0], dtSubject:dataSubject[0]})
    })
  })
})

router.post('/:id/:ids/givescore', (req, res)=>{
  Model.StudentSubject.update({
    score: req.body.score
  },{
    where: {
      StudentId: `${req.params.id}`,
      $and: {
        SubjectId: `${req.params.ids}`
      }
    }
  })
  .then(() => {
    res.redirect('/subject')
  })
})

module.exports = router
