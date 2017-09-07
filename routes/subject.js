const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res)=>{
  Model.Subject.findAll()
  .then(dataSubject => {
    // res.send(dataSubject)
    //[{"id":1,"subject_name":"kimia","createdAt":"2017-09-07T07:36:27.177Z","updatedAt":"2017-09-07T07:36:27.177Z"},{"id":2,"subject_name":"Ekonomi","createdAt":"2017-09-07T07:36:27.177Z","updatedAt":"2017-09-07T07:36:27.177Z"}]
    res.render('subject', {dtSubject:dataSubject})
    // projects will be an array of all Project instances
  })
  .catch((err) => {
    res.send(err)
  })
})

module.exports = router
