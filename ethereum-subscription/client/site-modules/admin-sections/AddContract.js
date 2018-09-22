import React, {Component, Fragment} from "react";
import AddContractForm from "../forms/AddContractForm";
import {connect} from "react-redux";
import Dispatcher from "../../services/loaders/Dispatcher";
import {getErrorString} from "../../services/utils";
import email from "../../../services/api/email";
import subscriptions from "../../../services/api/subscriptions";
import users from "../../../services/api/users";

class AddContract extends Component {
    handleSubmit = (addContractForm) => {
        const {
            messageState,
            setMessageState,
            setIsLoading,
            setComplete,
            hasFieldErrors
        } = addContractForm.props;

        if(hasFieldErrors()) return;

        setIsLoading();

        return subscriptions.addSubscriptionContract({
            address: messageState.contractAddress,
            details: messageState.subscriptionDetails,
            ownerUsername: messageState.supplierUsername,
            typeId: messageState.subscriptionTypeId
        }).then(() => users.getSupplier(messageState.supplierUsername))
            .then(userRes => email.sendContractCreatedMail({
                email: userRes.data[0].email,
                subscriptionName: messageState.subscriptionName
            }))
            .then(() => this.dispatcher.dispatchUpdateSubcriptionContracts({}))
            .then(() => {
                setComplete({
                    successTitle: "The contract has added successfully",
                    success: ["An email has been sent to the supplier."]
                });
            })
            .catch(err => {
                setMessageState({
                    isLoading: false,
                    errors: [getErrorString(err)]
                });
            });
    };

    componentDidMount(){
        this.dispatcher = new Dispatcher(this.props.dispatch);
    }

    render(){
        return (
            <Fragment>
                <h2>Add New Contract To Site</h2>
                <AddContractForm onSubmit={this.handleSubmit}/>
            </Fragment>
        );
    }
}

export default connect()(AddContract);