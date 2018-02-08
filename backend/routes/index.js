var router		= require('express').Router()
var auth			= require('./auth')
var flyer			= require('./flyer')

////// UNPROTECTED ROUTES //////

router.use((req,res,next) => {
	console.log("REQUEST");
	next();
})
router.post('/signup', auth.signup)
router.post('/login', auth.login)
router.post('/flagflyer', flyer.flag)
router.post('/getflyerinfo', flyer.getinfo)
router.post('/getflyers', flyer.getflyers)


////// PROTECTED ROUTES //////
router.use(auth.authenticate)
router.post('/createflyer', flyer.create)

module.exports = router
