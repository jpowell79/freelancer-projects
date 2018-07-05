import React, {Component} from 'react';
import {connect} from 'react-redux';
import Settings from '../../../../site-settings';
import {round} from "../../../../services/utils";
import Strings from "../../../../services/Strings";

class DividendInfo extends Component {
    render(){
        const {
            dividend,
            account
        } = this.props;

        if(account.isLoading || dividend.isLoading) return null;
        if(!Strings.isDefined(dividend.address)) return null;
        if(!Strings.isDefined(account.address)) return null;

        const share = (account.tradeTokens > 0)
            ? round(account.tradeTokens/dividend.totalTokenSupply, 2) : 0;
        const claim = (share > 0) ? round(dividend.value * share, 2) : 0;

        return (
            <div className="ui very relaxed list text-center">
                <div className="item">
                    <p className="h4">There are <span className="bold">{dividend.totalTokenSupply}</span> {Settings.TOKEN_NAME} tokens in existence.</p>
                </div>
                <div className="item">
                    <p className="h4">The current dividend stands at <span className="bold">{dividend.value}</span> Eth.</p>
                </div>
                <div className="item">
                    <p className="h4">You will be entitled to <span className="bold">{share*100}%</span> share of the dividend.</p>
                </div>
                <div className="item">
                    <p className="h4">You would be entitled to claim <span className="bold">{claim}</span> Eth.</p>
                </div>
                <div className="item">
                    <p className="h4">The current claim window dividend block number is <span className="bold">{dividend.block}.</span></p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        dividend,
        account
    } = state;

    return {
        dividend,
        account
    };
};

export default connect(mapStateToProps)(DividendInfo);