var assert = require('chai').assert;
import TaxBracket from "../src/common/TaxBracket";


var bracket = '10%';
describe('The '+bracket+' tax bracket', function(){
  var income = 5463;
  
  var bracket = new TaxBracket(0, 9225, 0.10, 0);
  
  var tax = bracket.calculateBracketTax(income);
  
  it('should return the correct tax', function(){
    assert.equal(tax, 546.30, 'Tax is not '+bracket+' ' + tax);
  });
});


bracket = '15%';
describe('The '+bracket+' tax bracket', function(){
  var income = 10000;
  
  var bracket = new TaxBracket(9226, 37450, 0.15, 922.50);
  
  var tax = bracket.calculateBracketTax(income);
  
  it('should return the correct tax', function(){
    assert.equal(tax, 1038.75, 'Tax is not '+bracket+' ' + tax);
  });
});


bracket = '25%';
describe('The '+bracket+' tax bracket', function(){
  var income = 45600;
  
  var bracket = new TaxBracket(37451, 90750, 0.25, 5156.25);
  
  var tax = bracket.calculateBracketTax(income);
  
  it('should return the correct tax', function(){
    assert.equal(tax, 7193.75, 'Tax is not '+bracket+' ' + tax);
  });
});


bracket = '28%';
describe('The '+bracket+' tax bracket', function(){
  var income = 150900;
  
  var bracket = new TaxBracket(90751, 189300, 0.28, 18481.25);
  
  var tax = bracket.calculateBracketTax(income);
  
  it('should return the correct tax', function(){
    assert.equal(tax, 35323.25, 'Tax is not '+bracket+' ' + tax);
  });
});


bracket = '33%';
describe('The '+bracket+' tax bracket', function(){
  var income = 280900;
  
  var bracket = new TaxBracket(189301, 411500, 0.33, 46075.25);
  
  var tax = bracket.calculateBracketTax(income);
  
  it('should return the correct tax', function(){
    assert.equal(tax, 76303.25, 'Tax is not '+bracket+' ' + tax);
  });
});


bracket = '35%';
describe('The '+bracket+' tax bracket', function(){
  var income = 412000;
  
  var bracket = new TaxBracket(411501, 413200, 0.35, 119401.25);
  
  var tax = bracket.calculateBracketTax(income);
  
  it('should return the correct tax', function(){
    assert.equal(tax, 119576.25, 'Tax is not '+bracket+' ' + tax);
  });
});


bracket = '39.6%';
describe('The '+bracket+' tax bracket', function(){
  var income = 900000;
  
  var bracket = new TaxBracket(413201, 0, 0.396, 119996.25);
  
  var tax = bracket.calculateBracketTax(income);
  
  it('should return the correct tax', function(){
    assert.equal(tax, 312769.05, 'Tax is not '+bracket+' ' + tax);
  });
});