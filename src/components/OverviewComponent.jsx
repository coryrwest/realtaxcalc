var React = require('react');
var State = require('../state');
var Utils = require('../utils');

var OverviewComponent = React.createClass({
    render: function render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td>Federal Income Tax:</td>
                                <td>
                                    <p className="text-right nopad">{Utils.cleanAndFormatMoney(this.props.state.federalTax)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>FICA:</td>
                                <td>
                                    <p className="text-right nopad">{Utils.cleanAndFormatMoney(this.props.state.FICA)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Total:</strong></td>
                                <td>
                                    <p className="text-right nopad">{Utils.cleanAndFormatMoney(this.props.state.totalTax)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Percentage of your income:</td>
                                <td>
                                    <p className="text-right nopad">{Utils.twoDigitRound(this.props.state.percentage)} %</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Take home pay:</td>
                                <td>
                                    <p className="text-right nopad">{Utils.cleanAndFormatMoney(this.props.state.takeHomePay)}</p>
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