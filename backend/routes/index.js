var router		= require('express').Router()
var auth			= require('./auth')
var flyer			= require('./flyer')

////// UNPROTECTED ROUTES //////

router.use((req,res,next) => {
	next();
})
router.post('/signup', auth.signup)
router.post('/login', auth.login)
router.post('/reset', auth.reset)
router.post('/getflyerinfo', flyer.getinfo)
router.post('/getflyers', flyer.getflyers)
router.post('/flagflyer', flyer.flag)

////// PROTECTED ROUTES //////
router.use(auth.authenticate)
router.post('/createflyer', flyer.create)
//router.post('/flagflyer', flyer.flag)


module.exports = router
