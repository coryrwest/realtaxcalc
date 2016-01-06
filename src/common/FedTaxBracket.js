class FedTaxBracket {
    constructor(bottom, top, rate, flatTax) {
        this.bottom = bottom;
        this.top = top;
        this.taxRate = rate;
        this.flatTax = flatTax;
    }
    
    calculateBracketTax(income) {
        var totalTaxForBracket = 0;
        var taxableInBracket = 0;
        var bottom = 0;
        // Get the bottom, if we are lowest use the provided value,
        // otherwise subtract one.
        if(this.bottom != 0) {
            bottom = (this.bottom - 1);
        }
        // Check flax tax first
        if(this.flatTax && this.flatTax > 0) {
            totalTaxForBracket = this.flatTax;
        }
        // Are we above the bottom of the bracket?
        var taxForTaxableAmount = 0;
        if(income > this.bottom) {
            taxableInBracket = income - bottom;
            taxForTaxableAmount = taxableInBracket * this.taxRate;
        }
        // If we are at the top then calculate tax on only that amount
        if(income > this.top && this.top != 0) {
            taxForTaxableAmount = this.top * this.taxRate;
        }
        
        totalTaxForBracket += taxForTaxableAmount;
        
        return Math.round(totalTaxForBracket * 100) / 100;
    }
}

export default FedTaxBracket;