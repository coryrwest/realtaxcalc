var React = require('react');
var Utils = require('../utils');

var TaxTable = require('../common/TaxTable');
var TaxData = require('json!../data/2015-Fed.json');

var OverviewComponent = React.createClass({
    calculateTaxes: function() {
        // Get taxableIncome
        this.taxableIncome = this.props.state.agi;
        this.exemptions = 0;
        this.deductions = 0;
        // Exemptions
        if(this.props.state.personalExemp) {
            this.exemptions += TaxData.exemptions.amount;
        }
        if(this.props.state.spouseExemp) {
            this.exemptions += TaxData.exemptions.amount;
        }
        // Dependents
        if(this.props.state.dependents > 0) {
            this.exemptions += TaxData.exemptions.amount * this.props.state.dependents;
        }
        this.taxableIncome = this.taxableIncome - this.exemptions;
        // Deductions
        if(this.props.state.standardDeduction) {
            this.deductions = TaxData.deductions[this.props.state.currentFilingStatus];
            this.taxableIncome = this.taxableIncome - this.deductions;
        }
        // Make sure taxable income is never negative
        if(this.taxableIncome < 0) {
            this.taxableIncome = 0;
        }
        
        var table = new TaxTable.default(TaxData);
        this.federalTax = table.determineBracketAndCalculateTax(this.props.state.currentFilingStatus, this.taxableIncome);
        this.otherTax = table.calculateOtherTax(this.taxableIncome);
        this.totaltax = this.federalTax + this.otherTax;
        this.percent = 0;
        this.takeHomePay = this.props.state.agi;
        
        if(this.totaltax > 0) {
            // Percent
            this.percent = (this.totaltax / this.taxableIncome) * 100;
                        
            // Take home pay
            this.takeHomePay = this.taxableIncome - this.totaltax;
        }
    },
    render: function render() {
        this.calculateTaxes();
        
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td>Exemptions:</td>
                                <td>
                                    <p className="text-right nopad">- {Utils.cleanAndFormatMoney(this.exemptions)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Deductions:</td>
                                <td>
                                    <p className="text-right nopad">- {Utils.cleanAndFormatMoney(this.deductions)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Taxable Income</strong></td>
                                <td>
                                    <p className="text-right nopad">{Utils.cleanAndFormatMoney(this.taxableIncome)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Federal Income Tax:</td>
                                <td>
                                    <p className="text-right nopad">{Utils.cleanAndFormatMoney(this.federalTax)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>FICA:</td>
                                <td>
                                    <p className="text-right nopad">{Utils.cleanAndFormatMoney(this.otherTax)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Total:</strong></td>
                                <td>
                                    <p className="text-right nopad">{Utils.cleanAndFormatMoney(this.totalTax)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Percentage of your income:</td>
                                <td>
                                    <p className="text-right nopad">{Utils.twoDigitRound(this.percent)} %</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Take home pay:</td>
                                <td>
                                    <p className="text-right nopad">{Utils.cleanAndFormatMoney(this.takeHomePay)}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>  
                </div>
            </div>
        );
    }
});

module.exports = OverviewComponent;