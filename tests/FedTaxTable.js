var assert = require('chai').assert;
import FedTaxTable from "../src/common/FedTaxTable";

var table = {
    "single": [
        {
            "bottom": 0,
            "top": 9225,
            "rate": 0.10,
            "flatTax": 0
        },
        {
            "bottom": 9226,
            "top": 37450,
            "rate": 0.15,
            "flatTax": 922.50
        },
        {
            "bottom": 37451,
            "top": 90750,
            "rate": 0.25,
            "flatTax": 5156.25
        },
        {
            "bottom": 90751,
            "top": 189300,
            "rate": 0.28,
            "flatTax": 18481.25
        },
        {
            "bottom": 189301,
            "top": 411500,
            "rate": 0.33,
            "flatTax": 46075.25
        },
        {
            "bottom": 411501,
            "top": 413200,
            "rate": 0.35,
            "flatTax": 119401.25
        },
        {
            "bottom": 413201,
            "top": 0,
            "rate": 0.396,
            "flatTax": 119996.25
        }
    ],
    "other": {
        "medicare": 0.0145,
        "socialSecurity": {
            "top": 118500,
            "rate": 0.062
        }
    }
};


describe('The tax table', function () {
    var taxTable = new FedTaxTable(table);

    it('should build the correct table', function () {
        assert.equal(taxTable.singleBrackets.length, 7,
            'The table does not have the correct number of brackets: ' + taxTable.singleBrackets.length);
    });
});

describe('The tax table', function () {
    var taxTable = new FedTaxTable(table);

    it('should contain medicare tax info', function () {
        assert.isDefined(taxTable.otherTax.medicare, 'The table does not defined medicare tax');
    });
});

describe('The tax table', function () {
    var taxTable = new FedTaxTable(table);

    it('should contain social security tax info', function () {
        assert.isDefined(taxTable.otherTax.ssTop, 'The table does not defined social security tax');
    });
});