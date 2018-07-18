import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dispatcher from "../../../../services/Dispatcher";
import PropTypes from 'prop-types';
import Strings from "../../../../services/Strings";

class UserClaimInfo extends Component {
    static propTypes = {
        accountAddress: PropTypes.string.isRequired,
        claimBlock: PropTypes.number.isRequired,
        totalEth: PropTypes.number.isRequired
    };

    componentDidMount(){
        new Dispatcher(this.props.dispatch).updateClaimInfo(
            this.props.accountAddress,
            this.props.claimBlock
        );
    }

    render(){
        const {claimInfo} = this.props;

        if(Object.keys(claimInfo).length === 0) return null;

        return (
            <div className="ui very relaxed list text-center">
                <div className="item">
                    <p className="h4">
                        You held <span className="bold">{
                            Strings.commaSeparate(claimInfo.claimBlockTokenBalance)
                        }</span> tokens
                        at the time of the current claim block.
                    </p>
                </div>
                <div className="item">
                    <p className="h4">
                        This amount of tokens represents
                        claim <span className="bold">{claimInfo.entitlementPercentage*100}%</span> of
                        the total supply of tokens.
                    </p>
                </div>
                <div className="item">
                    <p className="h4">
                        Based on the number of tokens held at the claim block number, your
                        Eth entitlement for the current claim window
                        is <span className="bold">{claimInfo.entitlementEth}</span>.
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {claimInfo} = state;
    return {claimInfo};
};

export default connect(mapStateToProps)(UserClaimInfo);