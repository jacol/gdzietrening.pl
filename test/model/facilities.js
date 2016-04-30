var dbpopulator = require('../mongo/populate');
var dbcleaner = require('../mongo/clear');
var facilityBuilder = require('../helpers/facilityBuilder');
var facilities = require('../../models/facilities');
var expect = require('chai').expect;
var should = require('chai').should();

describe("facility (with DB)", function() {
	
	describe("when no facilities in db", function(){
		it("should return error when getting all data", function(done){
			dbpopulator.populate([], function(){
				facilities.all(function(err, result){
					err.should.be.a('Error');
					err.message.should.equal('Facilities not found!');
					done();
				});
			});
		});
	});
	
   	describe("when add 2 facilities to db", function() {
        before(function(done){
            facilityBuilder.buildFromDataFiles(function(err, arr){
	            if(err)throw err;
	            dbpopulator.populate(arr, function(){
	                done();
	            });
            });
        });
        
        after(function(done) {
            dbcleaner.clear(function(err){
                if(err)throw err;
                done();
            });
        });
       
       describe("when call get all from DB", function(){
            it("should have three facilities in DB", function(done){
               facilities.all(function(err, docs){
                   if(err)throw err;
                   docs.length.should.equal(3);
                   done();
                });
            });
       });
       
       describe("when call get with particular name", function(){
            it("should get only one particular facility", function(done){
               facilities.getByName('Fort Gym - CrossFit Mjollnir', function(err, result){
                   if(err)throw err;
                   expect(result).not.to.be.null;
                   result.name.should.equal('Fort Gym - CrossFit Mjollnir');
                   done();
                });
            });
        });
       	
       	describe("when try to get facility that doesnt exist", function(){
       		it("should throw exception", function(done){
       			facilities.getByName('test3', function(err, result){
       				err.should.be.a('Error');
       				err.message.should.equal('Facility not found!');
       				done();
       			});
       		});
       	});
       	
       	describe("when try to get facility but there are more than 1 with that name", function(){
       		it("should throw exception", function(done){
       			var arr = [];
            	var facility1 = facilityBuilder.withName('Fitness Academy').
                                    withLocation('wroclaw').build();
                arr.push(facility1);
       			dbpopulator.populate(arr, function(){
	       			facilities.getByName('Fitness Academy', function(err, result){
	       				err.should.be.a('Error');
	       				err.message.should.equal('Found more than 1 facilities!');
	       				done();
	       			});
       			});
       		});
       	});
        
    });
});