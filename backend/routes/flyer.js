require('dotenv').config();
var MongoClient	= require('mongodb').MongoClient
var MongoURL		= process.env.MONGO_URL
var fs = require('fs');
var ObjectId    = require('mongodb').ObjectID
var gcloud = require('google-cloud') ({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: '../google-secret.json'
})

var gcs= gcloud.storage ({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: 'google-secret.json'
})


var create = function ( req, res ) {
  if (!req.body.title || !req.body.description || !req.body.startdate || !req.body.enddate)
    return res.json({ success: false, message: 'Insufficient information' })

  MongoClient.connect(MongoURL, function(err, db) {
    var flyers = db.collection('flyers')

    var bucket = gcs.bucket('bulletin');

    bucket.upload(req.file.path, function(err, file) {
      if (err) {
        res.send({ success: false, message: err })

        //res.send({ success: true, message: "Image uploaded", image_url:  'http://storage.googleapis.com/bulletin/' + req.file.filename })
      }
      else {

        fs.unlink(req.file.path, function(error) {
          if (error) {
            throw error;
          }
        });

        var flyer = {
          title: req.body.title,
          description: req.body.description,
          startdate: req.body.startdate,
          enddate: req.body.enddate,
    			flags: 0,
          image_url: 'http://storage.googleapis.com/bulletin/' + req.file.filename,
          owner: req.decoded.email
        }

        flyers.insert(flyer, function(err, result) {
          if (err)
            return res.json({ success: false, message: 'Error sending data to database'})
          return res.json({ success: true, message: 'Created new flyer' })
        })
      }
    });
  })
}

var flag = function ( req, res ) {
  if (!req.body.flyer)
    return res.json({ success: false, message: 'Insufficient information' })

  MongoClient.connect(MongoURL, function(err, db) {
    var flyers = db.collection('flyers')

    flyers.findOne( {_id : new ObjectId(req.body.flyer)}, function(err, result) {
      if (err)
        return res.json({ success: false, message: 'Error finding flyer in database'})

      if (result.users_flagged.includes(req.decoded.email)) {
          flyers.update({_id : new ObjectId(req.body.flyer)}, {$set:{'flags' : parseInt(result.flags) - 1}, $pull:{'users_flagged': req.decoded.email }})
          return res.json({ success: true, message: 'Unflagged Flyer' })
      }

      if (result.flags == 4) {
        flyers.remove({_id : new ObjectId(req.body.flyer)})
        return res.json({ success: true, message: 'Flagged flyer and deleted' })
      } else {
        flyers.update({_id : new ObjectId(req.body.flyer)}, {$set:{'flags' : parseInt(result.flags) + 1}, $push:{'users_flagged': req.decoded.email }})
        return res.json({ success: true, message: 'Flagged flyer' })        }
      })
    })

	//return res.json({ success: true, message: "test" })
}

var getinfo = function ( req, res ) {
  if (!req.body.flyer)
    return res.json({ success: false, message: 'Insufficient information' })

    MongoClient.connect(MongoURL, function(err, db) {
      var flyers = db.collection('flyers')

      console.log(req.body.flyer)

      flyers.find( {_id : new ObjectId(req.body.flyer)}).toArray(function(err, result) {
        if (err)
          return res.json({ success: false, message: 'Error finding flyer in database'})

          console.log(result)

        return res.json({result})
      })
    })

}

var getflyers = function ( req, res ) {
  //if (!req.body.start || !req.body.end)  WE WILL NEED THIS WHEN WE ADD FILTERS : TO KNOW
  //  return res.json({ success: false, message: 'Insufficient information' })

  MongoClient.connect(MongoURL, function(err, db) {
    var flyers = db.collection('flyers')

    flyers.find({}).toArray(function (err, result) {
      if (err)
        return res.json({ success: false, message: 'Error finding flyers in database'})

      for (var i in result) {
        try {
          if (result[i].hasOwnProperty('users_flagged'))
          if (result[i].users_flagged.includes(req.decoded.email))
            result.splice(i, 1)
        } catch (error) { console.log(error) }
      }

      return res.json({success: true , flyers:result})
    })
  })
}

var functions = {
  create: create,
  flag: flag,
  getinfo: getinfo,
  getflyers: getflyers
}

module.exports = functions
