import React, {Component, Fragment} from 'react';
import SubscriptionForm from "./SubscriptionForm";
import PropTypes from 'prop-types';
import withMetamask from '../../hocs/withMetamask';
import {Loader} from "../../modules/icons";
import objects from "../../../services/objects";

class EditContractForm extends Component {
    static defaultProps = {
        onCancel: () => {},
        onComplete: () => {}
    };

    static propTypes = {
        contract: PropTypes.object.isRequired,
        onCancel: PropTypes.func,
        onComplete: PropTypes.func
    };

    handleSubmit = (subscriptionForm) => {
        if(subscriptionForm.props.hasFieldErrors(this.state)) return;

        //TODO: _amendDetails

        this.props.onComplete(this);
    };

    render(){
        const {
            address,
            type,
            subscriptionName,
            subscriptionLengthInWeeks,
            totalSubscriptionPrice,
            joiningFee,
            exitFee,
            details
        } = this.props.contract;

        if(this.props.metamaskAccount.isLoading){
            return (
                <div className="text-center">
                    <Loader/>
                    <h3>Listening for account changes...</h3>
                </div>
            );
        }

        if(objects.isEmpty(this.props.metamaskAccount)){
            return (
                <p className="text">
                    Please login to metamask in order to edit this contract.
                </p>
            );
        }

        return (
            <Fragment>
                <SubscriptionForm
                    renderTopChildren={() => {
                        return (
                            <Fragment>
                                <p className="text">
                                    <strong>The address of this smart contract is:</strong> {
                                    address}
                                </p>
                                <p className="text">
                                    <strong>Your ethereum wallet address is:</strong> {
                                    this.props.metamaskAccount.address}
                                </p>
                            </Fragment>
                        );
                    }}
                    onSubmit={this.handleSubmit}
                    hideFields={['contactDetails', 'hasFreeTrials']}
                    defaultState={{
                        subscriptionName,
                        subscriptionType: type,
                        subscriptionLengthInWeeks,
                        subscriptionPrice: totalSubscriptionPrice,
                        joinFee: joiningFee,
                        exitFee,
                        subscriptionDetails: details
                    }}
                    renderExtraButtons={() => {
                        return (
                            <button
                                className="ui button"
                                style={{marginLeft: "15px"}}
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.props.onCancel(this);
                                }}
                            >
                                Cancel
                            </button>
                        );
                    }}
                />
            </Fragment>
        );
    }
}

export default withMetamask(EditContractForm);