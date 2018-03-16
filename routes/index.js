var express = require('express');
var router = express.Router();
var db = require('../models');
var methodOverride = require('method-override');
var sequelize   = require('sequelize');

var env         = process.env.NODE_ENV || 'extraVariables';
var config      = require(__dirname + '/../config/config.json')[env];

router.get('/', function(req, res, next) {
  res.send('Hello, World!');
});

// *** api routes *** //
router.get('/blobs', findAllBlobs);
router.get('/blob/:id', findBlobById);
router.post('/blobs', addBlob);
router.put('/blob/:id', updateBlob);
router.delete('/blob/:id', deleteBlob);


// *** get ALL blobs *** //
function findAllBlobs(req, res) {
  db.Blob.findAll({    
  }).then(function(data){
    // res.json(data);
  }).catch(function(err){
    res.json(err)
  })
}

// *** get SINGLE blobs *** //
function findBlobById(req, res) {
  db.Blob.findOne({
    where: {
      id : req.params.id
    }
  }).then(function(data){
    // res.json(data);
  }).catch(function(err){
    res.json(err);
  });
};

// *** post ALL blobs *** //
function addBlob(req, res) {
  db.Blob.create({
    name: req.body.name,
    lastName: req.body.lastName
  }).then(function(data){
    // res.json({'New Record' : data})
  }).catch(function(err){
    res.json(err)
  });
};

// *** put SINGLE blob *** //
function updateBlob(req, res) {
  db.Blob.update({
    name: req.body.name,
    lastName: req.body.lastName
  },{
    where: {
      id : req.params.id
    }
  }).then(function(data){
    // res.json(data)
  }).catch(function(err){
    res.json(err)
  })
}

// *** delete SINGLE blob *** //
function deleteBlob(req, res) {
  db.Blob.destroy({
    where: {
      id: req.params.id
    },
    truncate: true
  }).then(function(data){
    // res.json(data)
  }).catch(function(data){
    res.json(err)
  })
}

module.exports = router;
