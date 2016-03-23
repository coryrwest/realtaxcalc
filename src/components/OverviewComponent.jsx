var React = require('react');
var Utils = require('../utils');

var FedTaxScenario = require('../common/FedTaxScenario');
var TaxData = require('json!../data/2015-Fed.json');

var OverviewComponent = React.createClass({
    calculateTaxes: function() {
        // Build scenario data
        var scenarioData = {
            agi : this.props.state.agi,
            personalExemp : this.props.state.personalExemp,
            spouseExemp : this.props.state.spouseExemp,
            dependents : this.props.state.dependents,
            deduction : this.props.state.standardDeduction ? true : 0,
            filingStatus : this.props.state.currentFilingStatus
        };
        
        this.scenario = new FedTaxScenario.default(TaxData, scenarioData);
    },
    render: function render() {
        this.calculateTaxes();
        
        return (
            <div className="row">
                <div className="col-md-12">
                    <h3>Tax Breakdown:</h3>
                    <table className="table table-striped data-table">
                        <tbody>
                            <tr>
                                <td>Adjusted Gross Income:</td>
                                <td>
                                    <p className="text-right nopad">- {Utils.cleanAndFormatMoney(this.scenario.agi)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent-1">Exemptions:</td>
                                <td>
                                    <p className="text-right nopad">- {Utils.cleanAndFormatMoney(this.scenario.exemptions)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent-1">Deductions:</td>
                                <td>
                                    <p className="text-right nopad">- {Utils.cleanAndFormatMoney(this.scenario.deductions)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Taxable Income:</strong></td>
                                <td>
                                    <p className="text-right nopad">{Utils.cleanAndFormatMoney(this.scenario.taxableIncome)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent-1">Federal Income Tax:</td>
                                <td>
                                    <p className="text-right nopad">{Utils.cleanAndFormatMoney(this.scenario.incomeTax)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent-1">FICA:</td>
                                <td>
                                    <p className="text-right nopad">{Utils.cleanAndFormatMoney(this.scenario.otherTax)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Total Tax:</strong></td>
                                <td>
                                    <p className="text-right nopad">{Utils.cleanAndFormatMoney(this.scenario.totalTax)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Percentage of your income:</td>
                                <td>
                                    <p className="text-right nopad">{Utils.twoDigitRound(this.scenario.percent)} %</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Take home pay:</td>
                                <td>
                                    <p className="text-right nopad">{Utils.cleanAndFormatMoney(this.scenario.takeHomePay)}</p>
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