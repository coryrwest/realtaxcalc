class FedOtherTax {
    constructor(medicare, ssTop, ssRate) {
        this.medicare = medicare;
        this.ssTop = ssTop;
        this.ssRate = ssRate;
    }
    
    calculateOtherTax(income) {
        var medicareTax = income * this.medicare;
        
        var ssIncome = income;
        // If we are at the top of the ss tax use the max
        if(income > this.ssTop) {
            ssIncome = this.ssTop;
        }
        var ssTax = ssIncome * this.ssRate;
        
        var totalTax = medicareTax + ssTax;
        
        return Math.round(totalTax * 100) / 100;
    }
}

export default FedOtherTax;