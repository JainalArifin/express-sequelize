let express = require('express')
let router = express.Router()
let Model = require('../models')

router.get('/', (req, res)=>{
  res.render('login', {tampilSalah:false})
})


router.post('/', (req, res)=>{
  Model.User.findOne({
    where:{
      username: req.body.username,
      password: req.body.password
    }
  })
  .then((dataUser) => {

      console.log(dataUser, '<------');
    if(dataUser == null){
      res.render('login', {tampilSalah:' password atau email salah !!!'})
    }else {
      req.session.hasLogin = true
      req.session.role = dataUser.role

      res.redirect('/dasboard')
      // res.send(dataUser)
      // console.log(dataUser,'<------------');
      // res.render('')
    }
  })
  .catch((err) => {
    res.render('login', {tampilSalah:' password atau email salah !!!'})
  })
})

router.get('/logout', (req, res)=>{
  req.session.destroy()
  res.redirect('/login')
})

module.exports = router
