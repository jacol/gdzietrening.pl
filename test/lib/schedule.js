var should = require('chai').should();
var schedule = require('../../lib/schedule');
var facilityBuilder = require('../helpers/facilityBuilder');

describe("schedule", function() {
    describe(".create(facilities)", function() {
        describe("called with invalid data", function(){
            it("should break if null was passed", function(){
                schedule.create(null).should.be.empty;
            });

            it("should break if there are no facilities", function(){
                schedule.create([]).should.be.empty;
            });
        });

        describe("called with valid facilities, for 17.00 tue and 5 hours", function(){
            it("should return schedule with 15 items", function(done){
                facilityBuilder.buildFromDataFiles(function(err, arr){
                    var result = schedule.create(arr, new Date(2015, 8, 1, 17, 0, 0), 5);   //sroda, 2 wrzesnia 2015 17:00:00
                    result.length.should.equal(15);
                    done();
                });
            });
        });
        
        describe("called with valid facilities, for 20.00 thu and 6 hours", function(){
            it("should return schedule with 4 items", function(done){
                facilityBuilder.buildFromDataFiles(function(err, arr){
                    var result = schedule.create(arr, new Date(2015, 8, 3, 20, 0, 0), 6);
                    result.length.should.equal(4);
                    done();
                });
            });
            
            it("should have valid first item", function(done){
                facilityBuilder.buildFromDataFiles(function(err, arr){
                    var result = schedule.create(arr, new Date(2015, 8, 3, 20, 0, 0), 6).sort();
                    result[0][0].should.equal('Fitness Academy');
                    result[0][1].should.equal('STEP + BRZUCH');
                    result[0][2].should.equal('2015-09-03 20:00');
                    result[0][3].should.equal('2015-09-03 20:55');
                    result[0][4].should.equal('123123123');
                    result[0][5].should.to.not.be.null;
                    done();
                }, true);
            });
            
            it("should have valid second item", function(done){
                facilityBuilder.buildFromDataFiles(function(err, arr){
                    var result = schedule.create(arr, new Date(2015, 8, 3, 20, 0, 0), 6).sort();
                    result[1][0].should.equal('Fitness Club Hawana');
                    result[1][1].should.equal('CELU STOP **');
                    result[1][2].should.equal('2015-09-03 20:00');
                    result[1][3].should.equal('2015-09-03 20:50');
                    result[1][4].should.equal('123123123');
                    result[1][5].should.to.not.be.null;
                    done();
                }, true);
            });
            
            it("should have valid third item", function(done){
                facilityBuilder.buildFromDataFiles(function(err, arr){
                    var result = schedule.create(arr, new Date(2015, 8, 3, 20, 0, 0), 6).sort();
                    result[2][0].should.equal('Fitness Club Hawana');
                    result[2][1].should.equal('ZUMBA');
                    result[2][2].should.equal('2015-09-03 21:00');
                    result[2][3].should.equal('2015-09-03 21:50');
                    result[2][4].should.equal('123123123');
                    result[2][5].should.to.not.be.null;
                    done();
                }, true);
            });
            
            it("should have valid fourth item", function(done){
                facilityBuilder.buildFromDataFiles(function(err, arr){
                    var result = schedule.create(arr, new Date(2015, 8, 3, 20, 0, 0), 6).sort();
                    result[3][0].should.equal('Fort Gym - CrossFit Mjollnir');
                    result[3][1].should.equal('LEVEL 1');
                    result[3][2].should.equal('2015-09-03 20:00');
                    result[3][3].should.equal('2015-09-03 21:00');
                    result[3][4].should.equal('123123123');
                    result[3][5].should.to.not.be.null;
                    done();
                }, true);
            });
        });
    });
});

