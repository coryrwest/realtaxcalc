var assert = require('chai').assert;
import FedOthertax from "../src/common/FedOthertax";

describe('The other tax object', function(){
    var income = 219800;
      
    var otherTax = new FedOthertax(0.0145, 118500, 0.062);

    var tax = otherTax.calculateOtherTax(income);

    it('should calculate the correct tax', function(){
        assert.equal(tax, 10534.1, 'Other tax is not correct' + tax);
    });
});