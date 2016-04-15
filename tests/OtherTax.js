var assert = require('chai').assert;
import OtherTax from "../src/common/OtherTax";

import Data from "../src/data/2015-CA.json";
import FedData from "../src/data/2015-Fed.json";

var table = Data;
var fedTable = FedData;

describe('The state other tax object', function(){
    var income = 1546000;
      
    var otherTax = new OtherTax(null, table.other.mentalHealthServices.bottom, table.other.mentalHealthServices.rate);

    var tax = otherTax.calculateOtherTax(income);

    it('should calculate the correct tax', function(){
        assert.equal(tax, 5460, 'Other tax is not correct: ' + tax);
    });
});

describe('The fed other tax object', function(){
    var income = 219800;
      
    var otherTax = new OtherTax(null, fedTable.other.medicare.bottom, fedTable.other.medicare.rate);
    
    var tax = otherTax.calculateOtherTax(income);

    it('should calculate the correct medicare tax', function(){
        assert.equal(tax, 3187.1, 'Other tax is not correct: ' + tax);
    });
});

describe('The fed other tax object', function(){
    var income = 219800;
      
    var otherTax = new OtherTax(fedTable.other.socialSecurity.top, null, fedTable.other.socialSecurity.rate);

    var tax = otherTax.calculateOtherTax(income);

    it('should calculate the correct social security tax', function(){
        assert.equal(tax, 7347, 'Other tax is not correct: ' + tax);
    });
});