import React, {Component, Fragment} from 'react';
import {mailTypes, urls} from '../../../services/constants';
import axios from 'axios';
import AddContractForm from "../forms/AddContractForm";
import {connect} from 'react-redux';
import Dispatcher from '../../services/Dispatcher';
import {getErrorString} from "../../services/utils";

class AddContract extends Component {
    sendContractCreatedEmail = async ({email, subscriptionName}) => {
        return axios.post(`${urls.email}/${mailTypes.contractCreated}`, {
            email,
            subscriptionName,
        });
    };

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

        return axios.post(urls.subscriptionContracts, {
            address: messageState.contractAddress,
            details: messageState.subscriptionDetails,
            ownerUsername: messageState.supplierUsername,
            typeId: messageState.subscriptionTypeId
        }).then(() => axios.get(`${urls.users}/${messageState.supplierUsername}`))
            .then(userRes => this.sendContractCreatedEmail({
                email: userRes.data[0].email,
                subscriptionName: messageState.subscriptionName
            }))
            .then(() => this.dispatcher.dispatchUpdateSubcriptionContracts({}))
            .then(() => {
                setComplete({
                    successTitle: 'The contract has added successfully',
                    success: ['An email has been sent to the supplier.']
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