var should = require('chai').should();
var expect = require('chai').expect;
var weekDay = require('../../lib/weekDay');

describe("weekDay - getting day name for given date", function(){
	describe("when pass 05.09.2015", function(){
		it("should return 'sobota'", function(){
			weekDay.getDayOfWeek(new Date(2015, 8, 5)).should.equal('sobota');
		});
	});
	
	describe("when pass 06.09.2015", function(){
		it("should return 'niedziela'", function(){
			weekDay.getDayOfWeek(new Date(2015, 8, 6)).should.equal('niedziela');
		});
	});
	
	describe("when pass 07.09.2015", function(){
		it("should return 'poniedzialek'", function(){
			weekDay.getDayOfWeek(new Date(2015, 8, 7)).should.equal('poniedzialek');
		});
	});
	
	describe("when pass 08.09.2015", function(){
		it("should return 'wtorek'", function(){
			weekDay.getDayOfWeek(new Date(2015, 8, 8)).should.equal('wtorek');
		});
	});
	
	describe("when pass 09.09.2015", function(){
		it("should return 'sroda'", function(){
			weekDay.getDayOfWeek(new Date(2015, 8, 9)).should.equal('sroda');
		});
	});
	
	describe("when pass 10.09.2015", function(){
		it("should return 'czwartek'", function(){
			weekDay.getDayOfWeek(new Date(2015, 8, 10)).should.equal('czwartek');
		});
	});
	
	describe("when pass 11.09.2015", function(){
		it("should return 'piatek'", function(){
			weekDay.getDayOfWeek(new Date(2015, 8, 11)).should.equal('piatek');
		});
	});
});

describe("weekDay - getting next date for given day name", function() {
	describe("when passed 'poniedzialek' and 05.09.2015", function() {
		it("should return 07.09.2015", function(){
			var result = weekDay.getDateForDay('poniedzialek', new Date(2015, 8, 5));
			result.getFullYear().should.equal(2015);
			result.getMonth().should.equal(8);
			result.getDate().should.equal(7);
		});
	});
	
	describe("when passed 'poniedzialek' and 07.09.2015", function() {
		it("should return 07.09.2015", function(){
			var result = weekDay.getDateForDay('poniedzialek', new Date(2015, 8, 7));
			result.getFullYear().should.equal(2015);
			result.getMonth().should.equal(8);
			result.getDate().should.equal(7);
		});
	});
	
	describe("when passed 'poniedzialek' and 08.09.2015", function() {
		it("should return 14.09.2015", function(){
			var result = weekDay.getDateForDay('poniedzialek', new Date(2015, 8, 8));
			result.getFullYear().should.equal(2015);
			result.getMonth().should.equal(8);
			result.getDate().should.equal(14);
		});
	});
});