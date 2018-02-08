var MongoClient	= require('mongodb').MongoClient
var MongoURL		= 'mongodb://admin:password@ds227168.mlab.com:27168/bulletin'
var bcrypt			= require('bcryptjs')
var jwt					= require('jsonwebtoken')

//TODO: Hide in config
var jwtsecret = 'Thismasecret'

// validates and creates a new account
var signup = function ( req, res ) {

	//Check to make sure email and password are included
	if (!req.body.email || !req.body.password)
		return res.json({ success: false, message: "Insufficient Information" })
	//Check to make sure that email ends with @purdue.edu
	if (!req.body.email.endsWith('@purdue.edu'))
		return res.json({ success: false, message: 'Invalid Purdue Email'})
	//Check to make sure that the password is a proper length
	if (req.body.password.length < 8)
		return res.json({ success: false, message: 'Password is too short' })

	MongoClient.connect(MongoURL, function(err, db) {
		if (err)
			return res.json({ success: false, message: 'Error connecting to database' })

		//TODO: Bcrypt passwor

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
						created: new Date()
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
				return res.json({ success: false, message: 'User with that email already exists' })
		})
	})
}

// validates and signs user in
var login = function ( req, res ) {
	if (!req.body.email || !req.body.password)
		return res.json({ success: false, message: 'Insufficient login information' })

	MongoClient.connect(MongoURL, function(err, db) {
		var users = db.collection('users')
		users.find({ email: req.body.email }).toArray(function(err, result) {
			if (err)
				return res.json({ success: false, message: 'Error connecting to database' })
			if (result.length === 0)
				return res.json({ success: false, message: 'Invalid login information' })
			bcrypt.compare(req.body.password, result[0].password, function(err, match) {
				if (err)
					return res.json({ success: false, message: 'Error comparing passwords' })
				console.log(result[0].password, req.body.password)
				if (!match)
					return res.json({ success: false, message: 'Invalid login information' })
				else {
					var tokenitems = {
						_id: result[0]._id,
						email: req.body.email
					}
					var token = jwt.sign( tokenitems , jwtsecret,  {
						expiresIn: 86400 //24 Hours
					});

					return res.json({ success: true, message: 'Successfully logged in!', token: token });
				}
			})
		})
	})
}

// validates current password and resets it to new password
var reset = function ( req, res ) {
	if (!req.body.email || !req.body.oldPassword || !req.body.newPassword || !req.body.confirmPassword)
		return res.json({ success: false, message: 'Insufficient login information' })

	if (req.body.newPassword.length < 8)
		return res.json({ success: false, message: 'New Password is too short' })

	if (req.body.newPassword !== req.body.confirmPassword)
		return res.json({ success: false, message: 'New Passwords Do Not Match' })

	MongoClient.connect(MongoURL, function(err, db) {
		var users = db.collection('users')
		users.find({ email: req.body.email }).toArray(function(err, result) {
			if (err)
				return res.json({ success: false, message: 'Error connecting to database' })
			if (result.length === 0)
				return res.json({ success: false, message: 'Invalid login information' })
			bcrypt.compare(req.body.oldPassword, result[0].password, function(err, match) {
				if (err)
					return res.json({ success: false, message: 'Error comparing passwords' })
				console.log(result[0].password, req.body.oldPassword)
				if (!match)
					return res.json({ success: false, message: 'Invalid login information' })
				else {
					users.findOneAndUpdate({email: req.body.email}, {password: req.body.confirmPassword}).toArray(function(err, result) {
						return res.json({ success: true, message: 'Successfully Changed Password!'});
					})
				}
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
	reset: reset
}

module.exports = functions
