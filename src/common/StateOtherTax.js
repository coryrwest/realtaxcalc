class StateOtherTax {
    constructor(top, bottom, rate) {
        this.top = top;
        this.bottom = bottom;
        this.rate = rate;
    }
    
    calculateOtherTax(income) {
        var totalTax = 0;
        // Are we using a cut-off or a floor?
        if(this.top && this.top > 0) {
            // cut-off
            if(income < this.top) {
                totalTax = income * this.rate;
            }
        } else if(this.bottom && this.bottom > 0) {
            // floor
            if(income > this.bottom) {
                totalTax = (income - this.bottom) * this.rate;
            }
        }
        
        return Math.round(totalTax * 100) / 100;
    }
}

export default StateOtherTax;