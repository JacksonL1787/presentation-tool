const randomstring = require('randomstring')
const MongoClient = require('mongodb').MongoClient;

const presentationSchema = require('../models/presentationSchema')

module.exports = {
  createPresentation: function(req,res,next) {
    MongoClient.connect("mongodb://localhost:27017", function(err, client) {
        if(err) throw err
        var db = client.db('presentationTool');
        const id = randomstring.generate()
        const presentation = presentationSchema({
          id: id,
          title: req.body.title,
          design: req.body.design
        })
        db.collection('presentations').insert(presentation)
        res.send({id: id})
    })
  },
  deletePresentation: function(req,res,next) {
    MongoClient.connect("mongodb://localhost:27017", function(err, client) {
        if(err) throw err
        var db = client.db('presentationTool');
        db.collection('presentations').deleteOne({id: req.body.id})
        res.sendStatus(200)
    })
  }
}
