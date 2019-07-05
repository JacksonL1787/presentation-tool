const MongoClient = require('mongodb').MongoClient;

module.exports = {
  editor: function(req,res,next) {
    MongoClient.connect("mongodb://localhost:27017", function(err, client) {
        if(err) throw err
        var db = client.db('presentationTool');
        db.collection('presentations').find({'id': req.params.presentationID}).toArray(function(err,db) {
          if(err) throw err;
          res.render('editor', {presentation: JSON.stringify(db[0]), slide: req.params.slide});
        })
    })
  },
  presentations: function(req,res,next) {
    MongoClient.connect("mongodb://localhost:27017", function(err, client) {
        if(err) throw err
        var db = client.db('presentationTool');
        db.collection('presentations').find({}).toArray(function(err,db) {
          if(err) throw err;
          res.render('presentations', {presentations: JSON.stringify(db)});
        })
    })
  },
  preview: function(req,res,next) {
    MongoClient.connect("mongodb://localhost:27017", function(err, client) {
        if(err) throw err
        var db = client.db('presentationTool');
        db.collection('presentations').find({'id': req.params.presentationID}).toArray(function(err,db) {
          if(err) throw err;
          res.render('presenter-preview', {presentation: JSON.stringify(db[0]), slide: req.params.slide});
        })
    })
  },
}
