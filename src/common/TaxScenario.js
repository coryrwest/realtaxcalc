import TaxTable from "./TaxTable"

// returns:
//      taxTable
//      agi
//      exemptions
//      deductions
//      taxableIncome
//      incomeTax
//      otherTax
//      totalTax
//      percent
//      takeHomePay
class TaxScenario {
    // scenarioData
    //  agi
    //  personalExemp
    //  spouseExemp
    //  dependents
    //  deduction
    //  filingStatus
    constructor(tableJson, scenarioData) {
        // build tax table
        this.taxTable = {};
        this.agi = 0;
        this.taxableIncome = 0;
        this.exemptions = 0;
        this.deductions = 0;
        this.incomeTax = 0;
        this.otherTax = 0;
        this.totalTax = 0;
        this.percent = 0;
        this.takeHomePay = 0;
        
        this.taxTable = new TaxTable(tableJson);
        
        if (tableJson && scenarioData) {
            // -- Calculate taxableIncome
            this.agi = scenarioData.agi || 0;
            // Get taxableIncome
            this.taxableIncome = scenarioData.agi || 0;
            // Exemptions
            this.exemptions = this.calculateExemptions(tableJson, scenarioData.agi, scenarioData.filingStatus, 
                scenarioData.personalExemp, scenarioData.spouseExemp, scenarioData.dependents);
            this.taxableIncome = this.taxableIncome - this.exemptions;
            
            // Deductions
            var deductionType = isNaN(scenarioData.deduction) ? true : scenarioData.deduction;
            this.deductions = this.calculateDeductions(tableJson, scenarioData.filingStatus, deductionType);
            this.taxableIncome = this.taxableIncome - this.deductions;
                        
            // Make sure taxable income is never negative
            if(this.taxableIncome < 0) {
                this.taxableIncome = 0;
            }
            
            if(this.taxTable) {
                // -- Calculate taxes
                this.incomeTax = this.taxTable.incomeTax.getBracketAndCalculateBaseTax(scenarioData.filingStatus, this.taxableIncome);
                this.otherTax = this.taxTable.calculateOtherTax(this.taxableIncome);
                this.totalTax = this.incomeTax + this.otherTax;
            
                if(this.totalTax > 0) {
                    // Percent
                    this.percent = (this.totalTax / this.agi) * 100;    
                    // Take home pay
                    this.takeHomePay = this.agi - this.totalTax;
                }
            }
        }
    }
    
    calculateExemptions(tableJson, agi, filingStatus, personal, spouse, dependents) {
        var exemptions = 0;
        if(tableJson && tableJson.exemptions && tableJson.exemptions[filingStatus]) {
            var exemption = tableJson.exemptions[filingStatus];
            // Get exemption amount
            if (personal) {
                exemptions += exemption.amount;
            }
            if (spouse) {
                exemptions += exemption.amount;
            }
            
            // Calculate phaseouts, resetting the exemptions total 
            if(agi > exemption.phaseOut) {
                // Calculate number of steps
                var overage = agi - exemption.phaseOut;
                var steps = overage / exemption.amountStep;
                var exemptionReduction = exemption.reduction < 1 ? (exemption.reduction * exemptions) * steps : exemption.reduction * steps;
                var finalAmount = exemptions - exemptionReduction;
                exemptions = finalAmount;
            }
            // Dependents
            if(dependents > 0) {
                exemptions += tableJson.exemptions.dependents.amount * dependents;
            }
        }
        return exemptions;
    }
    
    calculateDeductions(tableJson, filingStatus, deductionType) {
        var deductions = 0;
        if(tableJson && tableJson.deductions) {
            // deductionType true means standard deduction.
            // if it is an integer, we were provided with an itemized deduction
            if(deductionType === true) {
                deductions = tableJson.deductions[filingStatus] || 0;
            } else if(!isNaN(deductionType)) {
                deductions = deductionType;
            }
        }
        return deductions;
    }
}

export default TaxScenario;