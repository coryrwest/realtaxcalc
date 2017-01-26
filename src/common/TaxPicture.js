import TaxScenario from "./TaxScenario"
// returns:
//      fed (tax scenario)
//      state (tax scenario)
//      agi
//      incomeTax
//      otherTax
//      totalTax
//      percent
//      takeHomePay
class TaxPicture {
    constructor(fedData, stateData, scenarioData) {
        this.fed = new TaxScenario(fedData, scenarioData);
        this.state = new TaxScenario(stateData, scenarioData);
        
        if(this.fed.agi !== this.state.agi) {
            throw new Error("The agi for the two scenarios provided does not match.");
        }
        
        this.agi = this.fed.agi;
        this.incomeTax = this.fed.incomeTax + this.state.incomeTax;
        this.otherTax = this.fed.otherTax + this.state.otherTax;
        this.totalTax = this.fed.totalTax + this.state.totalTax;
        this.percent = 0;
        this.takeHomePay = this.agi;
        if(this.totalTax > 0) {
            // Percent
            this.percent = (this.totalTax / this.agi) * 100;    
            // Take home pay
            this.takeHomePay = this.agi - this.totalTax;
        }
    }
}

export default TaxPicture;