var multer    = require('multer')
var router		= require('express').Router()
var auth			= require('./auth')
var flyer			= require('./flyer')
var fs = require('fs');
const path = require('path');

////// UNPROTECTED ROUTES //////
router.use((req,res,next) => {
	next();
})
router.use(multer({
  dest: 'tmp/'
}).single('image'))

router.post('/signup', auth.signup)
router.post('/login', auth.login)
router.post('/reset', auth.reset)
router.post('/checkUser', auth.checkUser)

////// PROTECTED ROUTES //////
router.use(auth.authenticate)
router.post('/createflyer', flyer.create)
router.post('/flagflyer', flyer.flag)
router.post('/getflyerinfo', flyer.getinfo)
router.post('/getflyers', flyer.getflyers)
router.post('/change', auth.change)
router.post('/collect', flyer.collect)
router.post('/getuserinfo', flyer.getuser)

module.exports = router
