var assert = require('chai').assert;
import StateTaxScenario from "../src/common/StateTaxScenario";

import Data from "../src/data/2015-CA.json";

var table = Data;

describe('The tax scenario (85000)', function () {
    var scenarioData = {
        agi : 85000,
        personalExemp : true,
        spouseExemp : true,
        dependents : 1,
        deduction : 'standard',
        filingStatus : 'marriedJoint'
    };
    
    var taxScenario = new StateTaxScenario(table, scenarioData);
    
    it('should build the correct scenario (agi)', function () {
        assert.equal(taxScenario.agi, 85000,
            'The table does not have the correct agi: ' + taxScenario.agi);
    });
    
    it('should build the correct scenario (taxableIncome)', function () {
        assert.equal(taxScenario.taxableIncome, 76357,
            'The table does not have the correct agi: ' + taxScenario.taxableIncome);
    });
    
    it('should build the correct scenario (exemptions)', function () {
        assert.equal(taxScenario.exemptions, 555,
            'The table does not have the correct exemption amount: ' + taxScenario.exemptions);
    });
    
    it('should build the correct scenario (standard deductions marriedJoint)', function () {
        assert.equal(taxScenario.deductions, 8088,
            'The table does not have the correct deductions amount: ' + taxScenario.deductions);
    });
    
    it('should build the correct scenario (taxableIncome)', function () {
        assert.equal(taxScenario.taxableIncome, 76357,
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
    
    var taxScenario = new StateTaxScenario(table, scenarioData);

    it('should build the correct scenario (exemptions with phaseout)', function () {
        assert.equal(taxScenario.agi, 350000,
            'The table does not have the correct agi: ' + taxScenario.taxableIncome);
    });
});