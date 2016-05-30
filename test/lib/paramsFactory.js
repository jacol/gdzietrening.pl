var should = require('chai').should();
var pFactory = require('../../lib/paramsFactory');

describe("paramsFactory", function(){
  describe("createForwardParams", function(){
    
    describe("wroclaw poniedzialek 8 6", function(){
      it("should return wroclaw poniedzialek 14 6", function(done){
        var result = pFactory.createForwardParams('wroclaw', 'poniedzialek', 8, 6);
        result.should.equal('/wroclaw/poniedzialek/14/6');
        done();
      })
    })
    
    describe("wroclaw poniedzialek 12 6", function(){
      it("should return wroclaw poniedzialek 18 6", function(done){
        var result = pFactory.createForwardParams('wroclaw', 'poniedzialek', 12, 6);
        result.should.equal('/wroclaw/poniedzialek/18/6');
        done();
      })
    })
    
    describe("wroclaw poniedzialek 12 3", function(){
      it("should return wroclaw poniedzialek 15 3", function(done){
        var result = pFactory.createForwardParams('wroclaw', 'poniedzialek', 12, 3);
        result.should.equal('/wroclaw/poniedzialek/15/3');
        done();
      })
    })
    
    describe("wroclaw poniedzialek 8 8", function(){
      it("should return wroclaw poniedzialek 16 8", function(done){
        var result = pFactory.createForwardParams('wroclaw', 'poniedzialek', 8, 8);
        result.should.equal('/wroclaw/poniedzialek/16/8');
        done();
      })
    })
    
    describe("wroclaw poniedzialek 18 6", function(){
      it("should return wroclaw wtorek 5 6", function(done){
        var result = pFactory.createForwardParams('wroclaw', 'poniedzialek', 18, 6);
        result.should.equal('/wroclaw/wtorek/5/6');
        done();
      })
    })
    
  })
  
  
  
  describe("createBackwardParams", function(){
    
    describe("wroclaw poniedzialek 8 6", function(){
      it("should return wroclaw niedziela 18 6", function(done){
        var result = pFactory.createBackwardParams('wroclaw', 'poniedzialek', 8, 6);
        result.should.equal('/wroclaw/niedziela/18/6');
        done();
      })
    })
    
    describe("wroclaw poniedzialek 12 6", function(){
      it("should return wroclaw poniedzialek 6 6", function(done){
        var result = pFactory.createBackwardParams('wroclaw', 'poniedzialek', 12, 6);
        result.should.equal('/wroclaw/poniedzialek/6/6');
        done();
      })
    })
    
    describe("wroclaw poniedzialek 12 3", function(){
      it("should return wroclaw poniedzialek 9 3", function(done){
        var result = pFactory.createBackwardParams('wroclaw', 'poniedzialek', 12, 3);
        result.should.equal('/wroclaw/poniedzialek/9/3');
        done();
      })
    })
    
    describe("wroclaw poniedzialek 18 6", function(){
      it("should return wroclaw poniedzialek 12 6", function(done){
        var result = pFactory.createBackwardParams('wroclaw', 'poniedzialek', 18, 6);
        result.should.equal('/wroclaw/poniedzialek/12/6');
        done();
      })
    })
    
  })
})