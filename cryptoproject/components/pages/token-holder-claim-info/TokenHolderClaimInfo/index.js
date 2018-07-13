import React, {Component} from 'react';
import {connect} from 'react-redux';
import Strings from "../../../../services/Strings";

class TokenHolderClaimInfo extends Component {
    render(){
        const {tokenHolderClaim} = this.props;

        if(tokenHolderClaim.isLoading) return null;
        if(!Strings.isDefined(tokenHolderClaim.address)) return null;

        return (
            <div className="ui very relaxed list text-center">
                <div className="item">
                    <p className="h4">There are <span className="bold">{tokenHolderClaim.totalTokenSupply}</span> tokens in existence.</p>
                </div>
                <div className="item">
                    <p className="h4">
                        The total amount of Eth available to claim
                        is <span className="bold">{tokenHolderClaim.totalEth}</span> for
                        claim number <span className="bold">{tokenHolderClaim.claimWindowNumber}</span>.
                    </p>
                </div>
                <div className="item">
                    <p className="h4">
                        The current claim block
                        is <span className="bold">{tokenHolderClaim.claimBlock}</span>.
                    </p>
                </div>
                <div className="item">
                    <p className="h4">
                        The claim window is currently <span className="bold">{
                            (tokenHolderClaim.claimWindowIsOpen)
                                ? "open" : "closed"
                        }</span>.
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {tokenHolderClaim} = state;

    return {tokenHolderClaim};
};

export default connect(mapStateToProps)(TokenHolderClaimInfo);