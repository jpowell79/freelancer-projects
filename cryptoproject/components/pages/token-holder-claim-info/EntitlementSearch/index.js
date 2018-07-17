import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Dispatcher from "../../../../services/Dispatcher";
import {updateClaimInfo} from "../../../../redux/actions";
import Strings from "../../../../services/Strings";

class EntitlementSearch extends Component {
    constructor(props){
        super(props);

        this.state = {
            address: '',
            error: null
        };

        this.handleAddressSubmitted = this.handleAddressSubmitted.bind(this);
    }

    handleAddressSubmitted(event){
        event.preventDefault();

        if(this.state.address === '' ||
            !this.state.address.startsWith('0x') ||
            this.state.address.length !== 42
        ){
            this.setState({error: 'The wallet address should start with 0x and be 42 characters long.'});
            return;
        }

        this.setState({error: null});

        new Dispatcher(this.props.dispatch).updateClaimInfo(
            this.state.address,
            this.props.tokenHolderClaim.claimBlock
        ).catch(() => {
            this.props.dispatch(updateClaimInfo({}));
            this.setState({
                error: (
                    <div className="ui error message">
                        <div className="header">
                            Unable to find any data connected to the given address.
                        </div>
                        <div className="content">
                            Please check that the given address is correct.
                        </div>
                    </div>
                )
            });
        });
    }

    render(){
        const {
            claimInfo
        } = this.props;

        return (
            <Fragment>
                <form className="ui form">
                    <div className={(this.state.error !== null) ? "field error" : "field"}>
                        <h3>Ethereum Wallet address</h3>
                        <input type="text" onChange={event => {
                            this.setState({
                                address: event.target.value
                            });
                        }}/>
                    </div>
                    <button
                        className="ui primary button"
                        onClick={this.handleAddressSubmitted}>Submit</button>
                </form>
                {(claimInfo.address !== undefined && !Strings.isDefined(this.state.error)) ? (
                    <div className="h4 divider-3 no-margin-bottom">
                        <p>
                            The address of <strong>{claimInfo.address}</strong> held <strong>{
                            claimInfo.claimBlockTokenBalance}</strong> tokens
                            at the current claim block and would therefore be entitle to a claim
                            of <strong>{claimInfo.entitlementEth}</strong> Eth.
                        </p>
                    </div>
                ) : (
                    (Strings.isDefined(this.state.error))
                        ? (
                            <div className="ui error message">
                                {this.state.error}
                            </div>
                        ) : null
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        claimInfo,
        tokenHolderClaim
    } = state;

    return {
        claimInfo,
        tokenHolderClaim
    };
};

export default connect(mapStateToProps)(EntitlementSearch);