
var env         = process.env.NODE_ENV || 'extraVariables';
var config      = require(__dirname + '/../config/config.json')[env];
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

// var mongoose = require("mongoose");
var sequelize   = require('sequelize');

var server = require('../app');
var db = require("../models");
var url = 'http://localhost:3000'

var should = chai.should();
chai.use(chaiHttp);


describe('Blobs', function() {
  this.timeout(15000);

  // Delete the table before start
  db.Blob.destroy({
    where: {},
    truncate: true
  })

  // Create a new record 
  beforeEach(function(done){
    db.Blob.create({
      name: 'Super',
      lastName: 'Girl'
    });
    done();
  });

  // Destroy the record
  afterEach(function(done){
    db.Blob.destroy({
      where: {},
      truncate: true
    })
    done();
  });

  it('should list ALL blobs on /blobs GET', function(done) {
    chai.request(url)
      .get('/blobs')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('lastName');
        res.body[0].name.should.equal('Super');
        res.body[0].lastName.should.equal('Girl');
        done();
      });
  });

  it('should add a SINGLE blob on /blobs POST', function(done) {
    chai.request(url)
      .post('/blobs')
      .send({'name': 'Java', 'lastName': 'Script'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('SUCCESS');
        res.body.SUCCESS.should.be.a('object');
        res.body.SUCCESS.should.have.property('name');
        res.body.SUCCESS.should.have.property('lastName');
        res.body.SUCCESS.should.have.property('_id');
        res.body.SUCCESS.name.should.equal('Java');
        res.body.SUCCESS.lastName.should.equal('Script');
        done();
      });
      done();
  });

  it('should update a SINGLE blob on /blob/<id> PUT', function(done) {
    chai.request(url)
      .get('/blobs')
      .end(function(err, res){
        chai.request(url)
          .put('/blob/1') // + res.body[0].id)
          .send({'name': 'Spider'})
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('UPDATED');
            response.body.UPDATED.should.be.a('object');
            response.body.UPDATED.should.have.property('name');
            response.body.UPDATED.should.have.property('id');
            response.body.UPDATED.name.should.equal('Spider');
            done();
        });
      });
      done();
  });

  it('should delete a SINGLE blob on /blob/<id> DELETE', function(done) {
    chai.request(url)
      .get('/blobs')
      .end(function(err, res){
        chai.request(url)
          .delete('/blob/1') //+res.body[0]._id)
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('REMOVED');
            response.body.REMOVED.should.be.a('object');
            response.body.REMOVED.should.have.property('name');
            response.body.REMOVED.should.have.property('id');
            response.body.REMOVED.name.should.equal('Wonder');
            done();
        });
      });
      done();
  });

});

