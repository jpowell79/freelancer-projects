import React, {Component} from "react";
import SubscriptionTable from "../subscription/SubscriptionTable";
import objects from "../../../services/datatypes/objects";
import {LoaderSmall} from "../../modules/icons";
import SubscriptionSections from "./subscriptions-sections";
import {connect} from "react-redux";
import {selectEditContract} from "../../redux/actions";

class Subscriptions extends Component {
    static mapStateToProps = ({editContract, subscriptionDetails, trialSubscriptionDetails}) => ({
        editContract,
        subscriptionDetails,
        trialSubscriptionDetails
    });

    render(){
        if(this.props.isLoadingContracts)
            return <LoaderSmall className="text-center"/>;

        if(!objects.isEmpty(this.props.editContract))
            return <SubscriptionSections {...this.props}/>;

        if(this.props.liveSubscriptionContracts.length === 0)
            return <p className="text">You do currently not own any subscriptions.</p>;

        return (
            <SubscriptionTable
                subscriptionContracts={this.props.liveSubscriptionContracts}
                buttonRenderer={({buttonClass, contract}) => {
                    return (
                        (contract.subscriptionCancelled)
                            ? (
                                <button
                                    className="ui button"
                                    disabled
                                >Cancelled</button>
                            ) : (
                                <button
                                    className="ui bg-color-uiBlue color-white button"
                                    onClick={() => this.props.dispatch(selectEditContract(contract))}
                                >
                                    {!contract.isActive ? "Activate" : "Edit"}
                                </button>
                            )
                    );
                }}
            />
        );
    }
}

export default connect(Subscriptions.mapStateToProps)(Subscriptions);