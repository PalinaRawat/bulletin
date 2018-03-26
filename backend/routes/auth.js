require('dotenv').config();
var MongoClient	= require('mongodb').MongoClient
var MongoURL		= process.env.MONGO_URL
var bcrypt			= require('bcryptjs')
var jwt					= require('jsonwebtoken')
var jwtsecret = process.env.JWTSECRET
var nodemailer = require('nodemailer');

var checkUser = function ( req, res ) {

	console.log('\n\nCheck User has been called!');

	if(!req.body.email)
		return res.json({ success: false, message: "Insufficient Information" })

	MongoClient.connect(MongoURL, function(err, db) {
    if (err)
      return res.json({ success: false, message: 'Error connecting to database' })
		var users = db.collection('users')
		users.find({ email: req.body.email }).toArray(function(err, result) {
			if (err)
				return res.json({ success: false, message: 'Error connecting to database' })
			if (result.length === 0)
				return res.json({ success: false, message: 'Invalid login information' })
			if (result.length)
				return res.json({ success: true, message: 'Please answer your Security Quetion', question: result[0].question })
		})
	})
}

// validates and creates a new account
var signup = function ( req, res ) {

	//Check to make sure email and password are included
	if (!req.body.email || !req.body.password ||  !req.body.securitya)
		return res.json({ success: false, message: "Insufficient Information" })
	//Check to make sure that email ends with @purdue.edu
	if (!req.body.email.endsWith('@purdue.edu'))
		return res.json({ success: false, message: ''})
	//Check to make sure that the password is a proper length
	if (req.body.password.length < 8)
		return res.json({ success: false, message: '' })

	MongoClient.connect(MongoURL, function(err, db) {
		if (err)
			return res.json({ success: false, message: 'Error connecting to database' })

		var users = db.collection('users')

		users.find({ email: req.body.email }).toArray(function (err, result) {
			if (err)
				return res.json({ success: false, message: 'Error connecting to database' })

			if (result.length === 0) {
				//Encrypt the password before sending it to the database
				bcrypt.hash(req.body.password, 10, function(err, hash) {
					if (err)
						return res.json({ success: false, message: 'Error encrypting password' })

					var user = {
						email: req.body.email,
						password: hash,
						verified: false,
						created: new Date(),
						question: req.body.securityq,
						answer: req.body.securitya,
            collected: []
					}

					users.insert(user, function ( err, db ) {
						if (err)
							return res.json({ success: false, message: 'Error inserting user into database' })
						else
							return res.json({ success: true, message: 'Created new account' })
					})
				})
			}

			if (result.length != 0)
				return res.json({ success: false, message: '' })
		})
	})
}

// validates and signs user in
var login = function ( req, res ) {

	if (!req.body.email)
		return res.json({ success: false, message: 'Insufficient login information' })

	MongoClient.connect(MongoURL, function(err, db) {
    if (err)
      return res.json({ success: false, message: 'Error connecting to database' })
		var users = db.collection('users')
		users.find({ email: req.body.email }).toArray(function(err, result) {
			if (err)
				return res.json({ success: false, message: 'Error connecting to database' })
			if (result.length === 0)
				return res.json({ success: false, message: 'Invalid login information' })
			bcrypt.compare(req.body.password, result[0].password, function(err, match) {
				if (err)
					return res.json({ success: false, message: 'Error comparing passwords' })
				//console.log(result[0].password, req.body.password)
				var tokenitems = {
				  _id: result[0]._id,
				  email: req.body.email
				}
				var token = jwt.sign( tokenitems , jwtsecret,  {
					expiresIn: 86400 //24 Hours
				});

				return res.json({ success: true, message: 'Successfully logged in!', token: token });
			})
		})
	})
}

// validates current password and resets it to new password
var reset = function ( req, res ) {

	console.log('\n\nReset has been called!');

	if (!req.body.email)
		return res.json({ success: false, message: 'Insufficient login information' })

	MongoClient.connect(MongoURL, function(err, db) {
    if (err)
      return res.json({ success: false, message: 'Error connecting to database' })
		var users = db.collection('users')
		users.find({ email: req.body.email }).toArray(function(err, result) {
			console.log('result.answer: ');
			console.log(result[0].answer);
			console.log('\nreq.body.answer: ');
			console.log(req.body.answer);
			if (err)
				return res.json({ success: false, message: 'Error connecting to database' })
			if (result.length === 0)
				return res.json({ success: false, message: 'Invalid login information' })

			if (result[0].answer !== req.body.answer)
				return res.json({ success: false, message: 'Incorrect Answer' })

			//New randomized password
			const newPassword = Math.random().toString(36).slice(-8)

			bcrypt.hash(newPassword, 10, function(err, hash) {
				if (err)
					return res.json({ success: false, message: 'Error encrypting password' })

					users.findOneAndUpdate( { email: req.body.email }, { $set: { password: hash } }, function (err, result2) {
            if (err)
      				return res.json({ success: false, message: 'Error connecting to database' })
						return res.json({ success: true, message: 'Password Successfully Changed to: ' + newPassword })
					})
			})

		})
	})
}

// validates current password and resets it to new password
var change = function ( req, res ) {
	if (!req.body.newPassword || !req.body.confirmPassword)
		return res.json({ success: false, message: 'Insufficient login information' })

	// if (req.body.newPassword.length < 8)
	// 	return res.json({ success: false, message: 'New Password is too short' })

	if (req.body.newPassword !== req.body.confirmPassword)
		return res.json({ success: false, message: 'New Passwords Do Not Match' })

	MongoClient.connect(MongoURL, function(err, db) {
		var users = db.collection('users')
		users.find({ email: req.decoded.email }).toArray(function(err, result) {
			if (err)
				return res.json({ success: false, message: 'Error connecting to database' })
			if (result.length === 0)
				return res.json({ success: false, message: 'Invalid login information' })

			bcrypt.hash(req.body.confirmPassword, 10, function(err, hash) {
				if (err)
					return res.json({ success: false, message: 'Error encrypting password' })

					users.findOneAndUpdate( { email: req.decoded.email }, { $set: { password: hash } }, function (err, result2) {
            if (err)
      				return res.json({ success: false, message: 'Error connecting to database' })
						console.log('password is now: ' + req.body.confirmPassword)
						return res.json({ success: true, message: 'Successfully Changed Password!'});
					})
			})
		})
	})
}

// verifies a users token
var authenticate = function ( req, res, next ) {
	var token = req.header('token');
	//If no token is provided in the header
	if (!token) {
		return res.send({ success: false, message: 'User is not logged in' });
	}

	//Verifies whether token is valid or not
	jwt.verify(token, jwtsecret, function(err, decoded) {
		if (err) {
			return res.send({ success: false, message: 'Failed to authenticate token' });
		} else {
			req.decoded = decoded;
			next();
		}
	})
}

var functions = {
	signup: signup,
	login: login,
	authenticate: authenticate,
	reset: reset,
	change: change,
	checkUser: checkUser
}

module.exports = functions
