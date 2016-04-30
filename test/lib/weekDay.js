var should = require('chai').should();
var expect = require('chai').expect;
var weekDay = require('../../lib/weekDay');

describe("weekDay - getting day name for given date", function(){
	describe("when pass 05.09.2015", function(){
		it("should return 'sat'", function(){
			weekDay.getDayOfWeek(new Date(2015, 8, 5)).should.equal('sat');
		});
	});
	
	describe("when pass 06.09.2015", function(){
		it("should return 'sun'", function(){
			weekDay.getDayOfWeek(new Date(2015, 8, 6)).should.equal('sun');
		});
	});
	
	describe("when pass 07.09.2015", function(){
		it("should return 'mon'", function(){
			weekDay.getDayOfWeek(new Date(2015, 8, 7)).should.equal('mon');
		});
	});
	
	describe("when pass 08.09.2015", function(){
		it("should return 'tue'", function(){
			weekDay.getDayOfWeek(new Date(2015, 8, 8)).should.equal('tue');
		});
	});
	
	describe("when pass 09.09.2015", function(){
		it("should return 'wed'", function(){
			weekDay.getDayOfWeek(new Date(2015, 8, 9)).should.equal('wed');
		});
	});
	
	describe("when pass 10.09.2015", function(){
		it("should return 'thu'", function(){
			weekDay.getDayOfWeek(new Date(2015, 8, 10)).should.equal('thu');
		});
	});
	
	describe("when pass 11.09.2015", function(){
		it("should return 'fri'", function(){
			weekDay.getDayOfWeek(new Date(2015, 8, 11)).should.equal('fri');
		});
	});
});

describe("weekDay - getting next date for given day name", function() {
	describe("when passed 'mon' and 05.09.2015", function() {
		it("should return 07.09.2015", function(){
			var result = weekDay.getDateForDay('mon', new Date(2015, 8, 5));
			result.getFullYear().should.equal(2015);
			result.getMonth().should.equal(8);
			result.getDate().should.equal(7);
		});
	});
	
	describe("when passed 'mon' and 07.09.2015", function() {
		it("should return 07.09.2015", function(){
			var result = weekDay.getDateForDay('mon', new Date(2015, 8, 7));
			result.getFullYear().should.equal(2015);
			result.getMonth().should.equal(8);
			result.getDate().should.equal(7);
		});
	});
	
	describe("when passed 'mon' and 08.09.2015", function() {
		it("should return 14.09.2015", function(){
			var result = weekDay.getDateForDay('mon', new Date(2015, 8, 8));
			result.getFullYear().should.equal(2015);
			result.getMonth().should.equal(8);
			result.getDate().should.equal(14);
		});
	});
});