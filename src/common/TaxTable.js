import FedTaxBracket from "./FedTaxBracket"
import FedOtherTax from "./FedOtherTax"

class TaxTable {
    constructor(tableJson) {
        this.singleBrackets = [];
        this.marriedJointBrackets = [];
        this.marriedSeparateBrackets = [];
        this.hohBrackets = [];
        this.otherTax = {};
        
        if (tableJson) {
            // Income Tax
            if(tableJson.single) {
                this.singleBrackets = buildBrackets(tableJson.single);
            }
            if(tableJson.marriedJoint) {
                this.marriedJointBrackets = buildBrackets(tableJson.marriedJoint);
            }
            if(tableJson.marriedSeparate) {
                this.marriedSeparateBrackets = buildBrackets(tableJson.marriedSeparate);
            }
            if(tableJson.hoh) {
                this.hohBrackets = buildBrackets(tableJson.hoh);
            }
            // Social Security and Medicare
            if(tableJson.other) {
                var other = tableJson.other;
                var otherTax = new FedOtherTax(other.medicare, other.socialSecurity.top, other.socialSecurity.rate)
                this.otherTax = otherTax;
            }
        }
    
        function buildBrackets(jsonBrackets) {
            var brackets = [];
            for (var i = 0; i < jsonBrackets.length; i++) {
                var current = jsonBrackets[i];
                var bracket = new FedTaxBracket(current.bottom, current.top, current.rate, current.flatTax);
                brackets.push(bracket);
            }
            return brackets;
        }
    }
}

export default TaxTable;