import FedTaxTable from "./TaxTable"

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
class FedTaxScenario {
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
        
        this.taxTable = new FedTaxTable(tableJson);
        
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
        if(tableJson && tableJson.exemptions) {
            // phaseouts
            // TODO: If income is above phaseout reduce by 2% for every $2500 ($1250 marriedSeparate) above.
            // If your AGI exceeds the amount shown above by more than $122,500 ($61,250 if married filing separately), the 
            // amount of your deduction for exemptions is reduced to zero.
            var exemptionReduction = 0;
            var exemption = tableJson.exemptions[filingStatus] || 0;            
            
            // Calculate Exemptions
            if(personal) {
                exemptions += exemption.amount;
            }
            if(spouse) {
                exemptions += exemption.amount;
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
            } else if(Number.isInteger(deductionType)) {
                deductions = deductionType;
            }
        }
        return deductions;
    }
}

export default FedTaxScenario;