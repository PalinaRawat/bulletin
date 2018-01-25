var router		= require('express').Router()

router.get('/', (req,res) => {
	res.send({ success: true, message: 'Successfully connected to server!' })
})

module.exports = router
