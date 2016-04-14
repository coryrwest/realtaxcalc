import TaxBracket from "./TaxBracket"
import StateOtherTax from "./StateOtherTax"
import IncomeTaxTable from "./IncomeTaxTable"

class StateTaxTable {
    constructor(tableJson) {
        this.incomeTax = {};
        this.otherTax = {};
        
        if (tableJson) {
            this.incomeTax = new IncomeTaxTable(tableJson);
            // State specific other Tax
            if(tableJson.other) {
                var other = tableJson.other;
                var otherKeys = Object.keys(other);
                for (var i = 0; i < otherKeys.length; i++) {
                    var otherData = other[otherKeys[i]];
                    this.otherTax.push(new StateOtherTax(otherData.top, otherData.bottom, otherData.rate));
                }
            }
        }
    }
    
    calculateOtherTax(agi) {
        // State specific other taxes
        var otherTax = this.otherTax.calculateOtherTax(agi);        
        return otherTax;
    }
}

export default StateTaxTable;