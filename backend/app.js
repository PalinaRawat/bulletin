require('dotenv').config();
var express			= require('express')
var app					= express()
var cors        = require('cors')
var bodyParser	= require('body-parser')
var routes			= require('./routes')
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use('/', routes)

var server = app.listen(port, () => { console.log('Server listening on port ' + port) })

module.exports.closeServer = function () {
	server.close();
}
