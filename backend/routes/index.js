var router		= require('express').Router()
var auth			= require('./auth')
var flyer			= require('./flyer')

////// UNPROTECTED ROUTES //////
router.get('/', (req,res) => {
	res.send({ success: true, message: 'Connected to server' })
})
router.post('/signup', auth.signup)
router.post('/login', auth.login)

////// PROTECTED ROUTES //////
router.use(auth.authenticate)
router.post('/createflyer', flyer.create)

module.exports = router
