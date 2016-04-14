import TaxBracket from "./TaxBracket"
import FedOtherTax from "./FedOtherTax"
import IncomeTaxTable from "./IncomeTaxTable"

class FedTaxTable {
    constructor(tableJson) {
        this.incomeTax = {};
        this.otherTax = {};
        
        if (tableJson) {
            this.incomeTax = new IncomeTaxTable(tableJson);
            // Social Security and Medicare
            if(tableJson.other) {
                var other = tableJson.other;
                var otherTax = new FedOtherTax(other.medicare, other.socialSecurity.top, other.socialSecurity.rate)
                this.otherTax = otherTax;
            }
        }
    }
    
    calculateOtherTax(agi) {
        // FICA
        var otherTax = this.otherTax.calculateOtherTax(agi);        
        return otherTax;
    }
}

export default FedTaxTable;