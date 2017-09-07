let express = require('express')
let router = express.Router()


router.get('/', (req, res)=>{
  // res.send('percobaan express')
  res.render('index')
  // res.send('percobaan')
})

module.exports = router
