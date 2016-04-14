var assert = require('chai').assert;
import FedTaxTable from "../src/common/FedTaxTable";

import Data from "../src/data/2015-Fed.json";

var table = Data;

describe('The tax table', function() {
    var taxTable = new FedTaxTable(table);

    it('should build the correct table', function() {
        assert.equal(taxTable.incomeTax.singleBrackets.length, 7,
            'The table does not have the correct number of brackets: ' + taxTable.incomeTax.singleBrackets.length);
    });
});

describe('The tax table', function() {
    var taxTable = new FedTaxTable(table);

    it('should contain medicare tax info', function() {
        assert.isDefined(taxTable.otherTax.medicare, 'The table does not defined medicare tax');
    });
});

describe('The tax table', function() {
    var taxTable = new FedTaxTable(table);

    it('should contain social security tax info', function() {
        assert.isDefined(taxTable.otherTax.ssTop, 'The table does not defined social security tax');
    });
});