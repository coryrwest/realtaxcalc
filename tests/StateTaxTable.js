var assert = require('chai').assert;
import StateTaxTable from "../src/common/StateTaxTable";

import Data from "../src/data/2015-CA.json";

var table = Data;

describe('The state tax table', function () {
    var taxTable = new StateTaxTable(table);

    it('should build the correct table', function () {
        assert.equal(taxTable.singleBrackets.length, 9,
            'The table does not have the correct number of brackets: ' + taxTable.singleBrackets.length);
    });
});

describe('The state tax table', function () {
    var taxTable = new StateTaxTable(table);

    it('should contain mentalHealthServices tax info', function () {
        assert.equal(taxTable.otherTax.length, 1, 'The table does not defined mentalHealthServices tax');
    });
});