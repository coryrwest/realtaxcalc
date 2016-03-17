var assert = require('chai').assert;
import FedTaxScenario from "../src/common/FedTaxScenario";

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
    "exemptions": {
        "amount" : 4000,
        "phaseOuts": [
            {"single": 258250},
            {"marriedJoint": 309900},
            {"marriedSeparate": 157950},
            {"hoh": 284050}
        ]
    },
    "deductions": {
        "single": 6300,
        "marriedJoint": 12600,
        "marriedSeparate": 6300,
        "hoh": 9250
    }
};


describe('The tax scenario (85000)', function () {
    var scenarioData = {
        agi : 85000,
        personalExemp : true,
        spouseExemp : true,
        dependents : 1,
        deduction : 'standard',
        filingStatus : 'marriedJoint'
    };
    
    var taxScenario = new FedTaxScenario(table, scenarioData);

    it('should build the correct scenario (agi)', function () {
        assert.equal(taxScenario.agi, 85000,
            'The table does not have the correct agi: ' + taxScenario.taxableIncome);
    });
    
    it('should build the correct scenario (exemptions)', function () {
        assert.equal(taxScenario.exemptions, 12000,
            'The table does not have the correct exemption amount: ' + taxScenario.exemptions);
    });
    
    it('should build the correct scenario (standard deductions marriedJoint)', function () {
        assert.equal(taxScenario.deductions, 12600,
            'The table does not have the correct deductions amount: ' + taxScenario.deductions);
    });
    
    it('should build the correct scenario (taxableIncome)', function () {
        assert.equal(taxScenario.taxableIncome, 60400,
            'The table does not have the correct exemption amount: ' + taxScenario.taxableIncome);
    });
});

describe('The tax scenario (350000)', function () {
    var scenarioData = {
        agi : 350000,
        personalExemp : true,
        spouseExemp : true,
        dependents : 1,
        deduction : 'standard',
        filingStatus : 'marriedJoint'
    };
    
    var taxScenario = new FedTaxScenario(table, scenarioData);

    console.log(taxScenario.findExemptionPhaseoutLevel(table, 'single'));

    it('should build the correct scenario (exemptions with phaseout)', function () {
        assert.equal(taxScenario.agi, 85000,
            'The table does not have the correct agi: ' + taxScenario.taxableIncome);
    });
});