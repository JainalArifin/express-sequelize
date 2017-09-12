let express = require('express')
let router = express.Router()

// router.use((req, res, next)=>{
//   if(req.session.role === 'teacher'){
//     next()
//   }else {
//     res.redirect('/login')
//   }
// })

router.get('/', (req, res)=>{
  // res.send('percobaan express')
  res.render('index', {title:'Home'})
  // res.send('percobaan')
})

module.exports = router
