var MongoClient	= require('mongodb').MongoClient
var MongoURL		= 'mongodb://localhost:27017/bulletin'

var create = function ( req, res ) {
  if (!req.body.title || !req.body.description || !req.body.startdate || !req.body.enddate)
    return res.json({ success: false, message: 'Insufficient information' })

  MongoClient.connect(MongoURL, function(err, db) {
    var flyers = db.collection('flyers')

    var flyer = {
      title: req.body.title,
      description: req.body.description,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      owner: req.decoded.email
    }

    flyers.insert(flyer, function(err, result) {
      if (err)
        return res.json({ success: false, message: 'Error sending data to database'})
      return res.json({ success: true, message: 'Created new flyer' })
    })
  })
}

var functions = {
  create: create
}

module.exports = functions
