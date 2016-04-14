// TODO: compose this into the fed and state tax tables

import TaxBracket from "./TaxBracket"

class IncomeTaxTable {
    constructor(tableJson) {
        this.singleBrackets = [];
        this.marriedJointBrackets = [];
        this.marriedSeparateBrackets = [];
        this.hohBrackets = [];
        
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
        }
    
        function buildBrackets(jsonBrackets) {
            var brackets = [];
            for (var i = 0; i < jsonBrackets.length; i++) {
                var current = jsonBrackets[i];
                var bracket = new TaxBracket(current.bottom, current.top, current.rate, current.flatTax);
                brackets.push(bracket);
            }
            return brackets;
        }
    }
    
    getBracketAndCalculateBaseTax(filingStatus, agi) {        
        // Get the bracket type
        var typedBrackets = {};
        if(filingStatus == "single") {
            typedBrackets = this.singleBrackets;
        }
        if(filingStatus == "marriedJoint") {
            typedBrackets = this.marriedJointBrackets;
        }
        if(filingStatus == "marriedSeparate") {
            typedBrackets = this.marriedSeparateBrackets;
        }
        if(filingStatus == "hoh") {
            typedBrackets = this.hohBrackets;
        }
        
        // Get the bracket
        var tax = 0;
        
        if(agi !== 0) {
            var bracket = {};
            for (var i = 0; i < typedBrackets.length; i++) {        
                if((agi < typedBrackets[i].top || typedBrackets[i].top == 0) && agi > typedBrackets[i].bottom) {
                    bracket = typedBrackets[i];
                }
            }
            
            tax = bracket.calculateBracketTax(agi);
        }
        
        return tax;
    }
    
    getBracket(filingStatus, agi) {
        var typedBrackets = {};
        if(filingStatus == "single") {
            typedBrackets = this.singleBrackets;
        }
        if(filingStatus == "marriedJoint") {
            typedBrackets = this.marriedJointBrackets;
        }
        if(filingStatus == "marriedSeparate") {
            typedBrackets = this.marriedSeparateBrackets;
        }
        if(filingStatus == "hoh") {
            typedBrackets = this.hohBrackets;
        }
        
        // Get the bracket 
        var bracketIndex = 0; 
        if(agi !== 0) {
            for (var i = 0; i < typedBrackets.length; i++) {        
                if((agi < typedBrackets[i].top || typedBrackets[i].top == 0) && agi > typedBrackets[i].bottom) {
                    bracketIndex = i;
                }
            }
        }
        
        return [bracketIndex, typedBrackets];
    }
}

export default IncomeTaxTable;