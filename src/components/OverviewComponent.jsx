var React = require('react');
var Utils = require('../utils');
var Popover = require('react-bootstrap').Popover;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;

var TaxPicture = require('../common/TaxPicture');
// Figure out a better way to do this
var FedTaxData = require('json!../data/2015-' + 'Fed' + '.json');
var StateTaxData = {
    'CA' : require('json!../data/2015-CA.json'),
    'TN' : require('json!../data/2015-TN.json')
};

var OverviewComponent = React.createClass({
    calculateTaxes: function() {
        // Build scenario data
        var scenarioData = {
            agi : this.props.state[this.props.index].agi,
            personalExemp : this.props.state[this.props.index].personalExemp,
            spouseExemp : this.props.state[this.props.index].spouseExemp,
            dependents : this.props.state[this.props.index].dependents,
            deduction : this.props.state[this.props.index].standardDeduction ? true : this.props.state[this.props.index].itemizedDeduction,
            filingStatus : this.props.state[this.props.index].currentFilingStatus
        };
        
        this.picture = new TaxPicture.default(FedTaxData, StateTaxData[this.props.state[this.props.index].state], scenarioData);
    },
    render: function render() {
        this.calculateTaxes();
        
        this.monthly = Utils.cleanAndFormatMoney(this.picture.takeHomePay / 12);
        this.biweekly = Utils.cleanAndFormatMoney(this.picture.takeHomePay / 26);
        this.weekly = Utils.cleanAndFormatMoney(this.picture.takeHomePay / 52);
        
        this.fed = {};
        this.fed.monthly = Utils.cleanAndFormatMoney(this.picture.fed.takeHomePay / 12);
        this.fed.biweekly = Utils.cleanAndFormatMoney(this.picture.fed.takeHomePay / 26);
        this.fed.weekly = Utils.cleanAndFormatMoney(this.picture.fed.takeHomePay / 52);
        
        this.state = {};
        this.state.monthly = Utils.cleanAndFormatMoney(this.picture.state.takeHomePay / 12);
        this.state.biweekly = Utils.cleanAndFormatMoney(this.picture.state.takeHomePay / 26);
        this.state.weekly = Utils.cleanAndFormatMoney(this.picture.state.takeHomePay / 52);
        
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className={this.props.state[this.props.index].displayState ? "visible" : "hidden"}>
                        <h3>Total Tax Breakdown:</h3>
                        <table className="table table-striped data-table">
                            <tbody>
                                <tr>
                                    <td>Adjusted Gross Income:</td>
                                    <td>
                                        <p className="text-right nopad nomar">- {Utils.cleanAndFormatMoney(this.picture.agi)}</p>
                                    </td>
                                </tr><tr>
                                    <td>Income Tax:</td>
                                    <td>
                                        <p className="text-right nopad nomar">{Utils.cleanAndFormatMoney(this.picture.incomeTax)}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Other Taxes:</td>
                                    <td>
                                        <p className="text-right nopad nomar">
                                            <OverlayTrigger trigger="click" placement="left" rootClose overlay={<Popover id="overall-othertax-breakdown" title="Other Taxes">This includes other taxes for both Federal and your filing state. Please see those breakdowns for more information.</Popover>}><i className="glyphicon glyphicon-info-sign"></i></OverlayTrigger>
                                            <span className="left-icon">{Utils.cleanAndFormatMoney(this.picture.otherTax)}</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Total Tax:</strong></td>
                                    <td>
                                        <p className="text-right nopad nomar">{Utils.cleanAndFormatMoney(this.picture.totalTax)}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Percentage of your income:</td>
                                    <td>
                                        <p className="text-right nopad nomar">{Utils.twoDigitRound(this.picture.percent)} %</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Take home pay:</td>
                                    <td>
                                        <p className="text-right nopad nomar">
                                            <OverlayTrigger trigger="click" placement="left" rootClose overlay={<Popover id="overall-pay-breakdown" title="Pay Breakdown">Monthly: {this.monthly} <br/> Bi-Weekly: {this.biweekly} <br/> Weekly: {this.weekly} </Popover>}><i className="glyphicon glyphicon-info-sign"></i></OverlayTrigger>
                                            <span className="left-icon">{Utils.cleanAndFormatMoney(this.picture.takeHomePay)}</span>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <h3>Federal Tax Breakdown:</h3>
                    <table className="table table-striped data-table">
                        <tbody>
                            <tr>
                                <td>Adjusted Gross Income:</td>
                                <td>
                                    <p className="text-right nopad nomar">- {Utils.cleanAndFormatMoney(this.picture.agi)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent-1">Exemptions:</td>
                                <td>
                                    <p className="text-right nopad nomar">- {Utils.cleanAndFormatMoney(this.picture.fed.exemptions)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent-1">Deductions:</td>
                                <td>
                                    <p className="text-right nopad nomar">- {Utils.cleanAndFormatMoney(this.picture.fed.deductions)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Taxable Income:</strong></td>
                                <td>
                                    <p className="text-right nopad nomar">{Utils.cleanAndFormatMoney(this.picture.fed.taxableIncome)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent-1">Federal Income Tax:</td>
                                <td>
                                    <p className="text-right nopad nomar">{Utils.cleanAndFormatMoney(this.picture.fed.incomeTax)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent-1">FICA:</td>
                                <td>
                                    <p className="text-right nopad nomar">
                                        <OverlayTrigger trigger="click" placement="left" rootClose overlay={<Popover id="overall-othertax-breakdown" title="Other Taxes">{this.picture.fed.taxTable.otherTaxExplanation}</Popover>}><i className="glyphicon glyphicon-info-sign"></i></OverlayTrigger>
                                        <span className="left-icon">{Utils.cleanAndFormatMoney(this.picture.fed.otherTax)}</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Total Tax:</strong></td>
                                <td>
                                    <p className="text-right nopad nomar">{Utils.cleanAndFormatMoney(this.picture.fed.totalTax)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Percentage of your income:</td>
                                <td>
                                    <p className="text-right nopad nomar">{Utils.twoDigitRound(this.picture.fed.percent)} %</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Take home pay:</td>
                                <td>
                                    <p className="text-right nopad nomar">
                                        <OverlayTrigger trigger="click" placement="left" rootClose overlay={<Popover id="fed-pay-breakdown" title="Pay Breakdown">Monthly: {this.fed.monthly} <br/> Bi-Weekly: {this.fed.biweekly} <br/> Weekly: {this.fed.weekly} </Popover>}><i className="glyphicon glyphicon-info-sign"></i></OverlayTrigger>
                                        <span className="left-icon">{Utils.cleanAndFormatMoney(this.picture.fed.takeHomePay)}</span>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>  
                    
                    <div className={this.props.state[this.props.index].displayState ? "visible" : "hidden"}>
                        <h3>State Tax Breakdown:</h3>
                        <table className="table table-striped data-table">
                            <tbody>
                                <tr>
                                    <td>Adjusted Gross Income:</td>
                                    <td>
                                        <p className="text-right nopad nomar">- {Utils.cleanAndFormatMoney(this.picture.agi)}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="indent-1">Exemptions:</td>
                                    <td>
                                        <p className="text-right nopad nomar">- {Utils.cleanAndFormatMoney(this.picture.state.exemptions)}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="indent-1">Deductions:</td>
                                    <td>
                                        <p className="text-right nopad nomar">- {Utils.cleanAndFormatMoney(this.picture.state.deductions)}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Taxable Income:</strong></td>
                                    <td>
                                        <p className="text-right nopad nomar">{Utils.cleanAndFormatMoney(this.picture.state.taxableIncome)}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="indent-1">State Income Tax:</td>
                                    <td>
                                        <p className="text-right nopad nomar">{Utils.cleanAndFormatMoney(this.picture.state.incomeTax)}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="indent-1">Other Taxes:</td>
                                    <td>
                                        <p className="text-right nopad nomar">
                                            <OverlayTrigger trigger="click" placement="left" rootClose overlay={<Popover id="overall-othertax-breakdown" title="Other Taxes">{this.picture.state.taxTable.otherTaxExplanation}</Popover>}><i className="glyphicon glyphicon-info-sign"></i></OverlayTrigger>
                                            <span className="left-icon">{Utils.cleanAndFormatMoney(this.picture.state.otherTax)}</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Total Tax:</strong></td>
                                    <td>
                                        <p className="text-right nopad nomar">{Utils.cleanAndFormatMoney(this.picture.state.totalTax)}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Percentage of your income:</td>
                                    <td>
                                        <p className="text-right nopad nomar">{Utils.twoDigitRound(this.picture.state.percent)} %</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Take home pay:</td>
                                    <td>
                                        <p className="text-right nopad nomar">
                                            <OverlayTrigger trigger="click" placement="left" rootClose overlay={<Popover id="state-pay-breakdown" title="Pay Breakdown">Monthly: {this.state.monthly} <br/> Bi-Weekly: {this.state.biweekly} <br/> Weekly: {this.state.weekly} </Popover>}><i className="glyphicon glyphicon-info-sign"></i></OverlayTrigger>
                                            <span className="left-icon">{Utils.cleanAndFormatMoney(this.picture.state.takeHomePay)}</span>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = OverviewComponent;