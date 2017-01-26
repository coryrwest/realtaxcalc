import React from 'react';
import Utils from '../utils';

import TaxPicture from '../common/TaxPicture';
const FedTaxData = require('json!../data/2015-Fed.json');
const StateTaxData = {
    'CA' : require('json!../data/2015-CA.json'),
    'TN' : require('json!../data/2015-TN.json')
};

let BracketDisplayComponent = React.createClass({
    getBracket: function() {
        // Build scenario data
        const scenarioData = {
            agi : this.props.scenarioSettings.agi,
            personalExemp : this.props.scenarioSettings.personalExemp,
            spouseExemp : this.props.scenarioSettings.spouseExemp,
            dependents : this.props.scenarioSettings.dependents,
            deduction : this.props.scenarioSettings.standardDeduction ? true : 0,
            filingStatus : this.props.scenarioSettings.currentFilingStatus
        };
        
        this.picture = new TaxPicture(FedTaxData, StateTaxData[this.props.scenarioSettings.state], scenarioData);
               
        // Federal Brackets
        const fedTaxTable = this.picture.fed.taxTable;
        var fedBrackets = fedTaxTable.incomeTax.getBracket(this.props.scenarioSettings.currentFilingStatus, this.picture.fed.taxableIncome);
        this.fedBracketIndex = fedBrackets[0];
        this.fedBrackets = fedBrackets[1];
        
        // State Brackets
        const stateTaxTable = this.picture.state.taxTable;
        var stateBrackets = stateTaxTable.incomeTax.getBracket(this.props.scenarioSettings.currentFilingStatus, this.picture.state.taxableIncome);
        this.stateBracketIndex = stateBrackets[0];
        this.stateBrackets = stateBrackets[1];
    },
    render: function render() {
        this.getBracket();
        var fedIndex = this.fedBracketIndex;
        var fedBracketItems = this.fedBrackets.map(function(bracket, i){
            return (
                <tr className={i === fedIndex ? 'active' : ''}>
                    <td>{Utils.cleanAndFormatMoney(bracket.bottom)}</td>
                    <td>{Utils.cleanAndFormatMoney(bracket.top)}</td>
                    <td>{Utils.twoDigitRound(bracket.taxRate * 100)} %</td>
                    <td>{Utils.cleanAndFormatMoney(bracket.flatTax)}</td>
                </tr>
            )
        });
        
        var stateIndex = this.stateBracketIndex;
        var stateBracketItems = this.stateBrackets.map(function(bracket, i){
            return (
                <tr className={i === stateIndex ? 'active' : ''}>
                    <td>{Utils.cleanAndFormatMoney(bracket.bottom)}</td>
                    <td>{Utils.cleanAndFormatMoney(bracket.top)}</td>
                    <td>{Utils.twoDigitRound(bracket.taxRate * 100)} %</td>
                    <td>{Utils.cleanAndFormatMoney(bracket.flatTax)}</td>
                </tr>
            )
        });
        
        return (
            <div className="row">
                <div className="col-md-12">
                    <h3>Federal Tax Bracket:</h3>
                    <table className="table table-striped data-table">
                        <tbody>
                            <tr>
                                <th>Bottom</th>
                                <th>Top</th>
                                <th>Tax Rate</th>
                                <th>Flat Tax</th>
                            </tr>
                            {fedBracketItems}
                        </tbody>
                    </table> 
                    
                    <div className={this.props.scenarioSettings.displayState ? "visible" : "hidden"}> 
                        <h3>State Tax Bracket:</h3>
                        <table className="table table-striped data-table">
                            <tbody>
                                <tr>
                                    <th>Bottom</th>
                                    <th>Top</th>
                                    <th>Tax Rate</th>
                                    <th>Flat Tax</th>
                                </tr>
                                {stateBracketItems}
                            </tbody>
                        </table>  
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BracketDisplayComponent;