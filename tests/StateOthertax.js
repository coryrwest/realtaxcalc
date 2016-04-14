var assert = require('chai').assert;
import StateOtherTax from "../src/common/StateOthertax";

import Data from "../src/data/2015-CA.json";

var table = Data;

describe('The state other tax object', function(){
    var income = 1546000;
      
    var otherTax = new StateOtherTax(null, table.other.mentalHealthServices.bottom, table.other.mentalHealthServices.rate);

    var tax = otherTax.calculateOtherTax(income);

    it('should calculate the correct tax', function(){
        assert.equal(tax, 5460, 'Other tax is not correct' + tax);
    });
});