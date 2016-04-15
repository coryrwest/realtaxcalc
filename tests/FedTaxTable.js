var assert = require('chai').assert;
import TaxTable from "../src/common/TaxTable";

import Data from "../src/data/2015-Fed.json";

var table = Data;

describe('The tax table', function() {
    var taxTable = new TaxTable(table);

    it('should build the correct table', function() {
        assert.equal(taxTable.incomeTax.singleBrackets.length, 7,
            'The table does not have the correct number of brackets: ' + taxTable.incomeTax.singleBrackets.length);
    });
});

describe('The tax table', function() {
    var taxTable = new TaxTable(table);

    it('should contain medicare tax info', function() {
        assert.isDefined(taxTable.otherTax.medicare, 'The table does not defined medicare tax');
    });
});

describe('The tax table', function() {
    var taxTable = new TaxTable(table);

    it('should contain social security tax info', function() {
        assert.isDefined(taxTable.otherTax.socialSecurity, 'The table does not defined social security tax');
    });
});




import StateData from "../src/data/2015-CA.json";

var stateTable = StateData;

describe('The state tax table', function () {
    var taxTable = new TaxTable(stateTable);

    it('should build the correct table', function () {
        assert.equal(taxTable.incomeTax.singleBrackets.length, 9,
            'The table does not have the correct number of brackets: ' + taxTable.incomeTax.singleBrackets.length);
    });
});

describe('The state tax table', function () {
    var taxTable = new TaxTable(stateTable);

    it('should contain mentalHealthServices tax info', function () {
        assert.isDefined(taxTable.otherTax.mentalHealthServices, 'The table does not defined mentalHealthServices tax');
    });
});