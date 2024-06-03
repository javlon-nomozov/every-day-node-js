const { Profile } = require('../models')

const router = require('express').Router()
router.use('/users', require('./users/router'))
router.get('/profiles', (req,res)=>{
    Profile.findAll().then(data=>{res.json(data)})
})
module.exports = router