var assert = require('chai').assert;
import FedTaxScenario from "../src/common/TaxScenario";

import Data from "../src/data/2015-Fed.json";

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

    it('should build the correct scenario (exemptions with phaseout)', function () {
        assert.equal(taxScenario.agi, 350000,
            'The table does not have the correct agi: ' + taxScenario.taxableIncome);
    });
});