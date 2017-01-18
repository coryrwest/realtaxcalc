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
        
        const s = this.singleBrackets == null || this.singleBrackets.length <= 0;
        const mj = this.marriedJointBrackets == null || this.marriedJointBrackets.length <= 0;
        const ms = this.marriedSeparateBrackets == null || this.marriedSeparateBrackets.length <= 0;
        const hoh = this.hohBrackets == null || this.hohBrackets.length <= 0;
        
        if(s || mj || ms || hoh) {
            throw new Error('Tax table data did not load correctly. ' + 
            `Single: ${s}, MarriedJoint: ${mj}, MarriedSeparate: ${ms}, Hoh: ${hoh}`);
        }
    
        function buildBrackets(jsonBrackets) {
            let brackets = [];
            for (var i = 0; i < jsonBrackets.length; i++) {
                const current = jsonBrackets[i];
                const bracket = new TaxBracket(current.bottom, current.top, current.rate, current.flatTax);
                brackets.push(bracket);
            }
            return brackets;
        }
    }
    
    getBracketAndCalculateBaseTax(filingStatus, agi) {
        // Get the bracket type
        let typedBrackets = {};
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
        let tax = 0;
        
        if(agi > 0) {
            let bracket = {};
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
        let typedBrackets = {};
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
        let bracketIndex = 0; 
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