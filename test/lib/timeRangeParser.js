var should = require('chai').should();
var expect = require('chai').expect;
var parser = require('../../lib/timeRangeParser');

describe("time range parser", function() {
	var baseDate = new Date(2015, 8, 5);
	
	describe("when pass valid range 12:00-13:00", function() {
		var timeRangeStr = "12:00-13:00";
		
		it("should parse it to start date", function(){
			var result = parser.getStartTime(timeRangeStr, baseDate);
			result.getHours().should.equal(12);
			result.getMinutes().should.equal(0);
		});
		
		it("should parse it to end date", function(){
			var result = parser.getEndTime(timeRangeStr, baseDate);
			result.getHours().should.equal(13);
			result.getMinutes().should.equal(0);
		});
	});
	
	describe("when pass valid range 08:15-22:50", function() {
		var timeRangeStr = "08:15-22:50";
		
		it("should parse it to start date", function(){
			var result = parser.getStartTime(timeRangeStr, baseDate);
			result.getHours().should.equal(8);
			result.getMinutes().should.equal(15);
		});
		
		it("should parse it to end date", function(){
			var result = parser.getEndTime(timeRangeStr, baseDate);
			result.getHours().should.equal(22);
			result.getMinutes().should.equal(50);
		});
	});
	
	describe("when pass invalid range 12:0-13:00", function() {
		var timeRangeStr = "12:0-13:00";
		
		it("should throw exception", function(){
			var fn = function(){parser.getStartTime(timeRangeStr, baseDate)};
			expect(fn).to.throw(Error);
		});
		
		it("should parse it to end date", function(){
			var result = parser.getEndTime(timeRangeStr, baseDate);
			result.getHours().should.equal(13);
			result.getMinutes().should.equal(0);
		});
	});
	
	describe("when pass invalid range 1200-13:00", function() {
		var timeRangeStr = "12:0-13:00";
		
		it("should throw exception", function(){
			var fn = function(){parser.getStartTime(timeRangeStr, baseDate)};
			expect(fn).to.throw(Error);
		});
		
		it("should parse it to end date", function(){
			var result = parser.getEndTime(timeRangeStr, baseDate);
			result.getHours().should.equal(13);
			result.getMinutes().should.equal(0);
		});
	});
});

