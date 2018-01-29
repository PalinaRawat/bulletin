var router		= require('express').Router()
var auth			= require('./auth')

////// UNPROTECTED ROUTES //////

router.get('/', (req,res) => {
	res.send({ success: true, message: 'Successfully connected to server!' })
})
router.post('/signup', auth.signup)
router.post('/login', auth.login)

////// PROTECTED ROUTES //////

router.use(auth.authenticate)

module.exports = router
