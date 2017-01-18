import TaxBracket from "./TaxBracket"
import OtherTax from "./OtherTax"
import IncomeTaxTable from "./IncomeTaxTable"

class TaxTable {
    constructor(tableJson) {
        this.incomeTax = {};
        this.otherTax = {};
        this.otherTaxExplanation = '';

        if (tableJson) {
            // Build income tax object
            this.incomeTax = new IncomeTaxTable(tableJson);
            // Build other tax object
            if (tableJson.other) {
                const other = tableJson.other;
                const otherKeys = Object.keys(other);
                for (var i = 0; i < otherKeys.length; i++) {
                    const otherData = other[otherKeys[i]];
                    this.otherTax[otherKeys[i]] = new OtherTax(otherData.top, otherData.bottom, otherData.rate);
                }
            }
            
            if(tableJson.otherTaxExplanation) {
                this.otherTaxExplanation = tableJson.otherTaxExplanation;
            }
        }
    }

    calculateOtherTax(agi) {
        let otherTax = 0;
        const otherKeys = Object.keys(this.otherTax);
        for (var i = 0; i < otherKeys.length; i++) {
            let oT = this.otherTax[otherKeys[i]];
            otherTax += oT.calculateOtherTax(agi);
        }
        return otherTax;
    }
}

export default TaxTable;