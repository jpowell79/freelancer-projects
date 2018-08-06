import React, {Component, Fragment} from 'react';
import SortableTable from "../../modules/SortableTable";
import {connect} from 'react-redux';
import AddContractTypeForm from "../forms/AddContractTypeForm";
import axios from 'axios';
import {urls} from '../../../services/constants';
import Dispatcher from '../../services/Dispatcher';

class AddContractType extends Component {
    static mapStateToProps = ({subscriptionTypes}) => ({subscriptionTypes});

    handleSubmit = (addContractTypeForm) => {
        if(addContractTypeForm.props.hasFieldErrors()) return;

        const {
            messageState,
            setIsLoading,
            setMessageState
        } = addContractTypeForm.props;

        setIsLoading();

        return axios.post(urls.subscriptionTypes, {
            name: messageState.contractType
        }).then(() => this.dispatcher.dispatchUpdateSubscriptionTypes({}))
            .then(() => {
                setMessageState({isLoading: false});
            })
            .catch(err => {
                setMessageState({
                    isLoading: false,
                    errors: [err.toString()]
                });
            });
    };

    componentDidMount(){
        this.dispatcher = new Dispatcher(this.props.dispatch);
    }

    render(){
        return (
            <Fragment>
                <h2>Add New Contract Type</h2>
                <AddContractTypeForm onSubmit={this.handleSubmit}/>
                <hr className="ui divider"/>
                <h2>Contract Types</h2>
                <SortableTable>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.subscriptionTypes.map((type, i) => {
                        return (
                            <tr key={i}>
                                <td>{type.id}</td>
                                <td>{type.name}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </SortableTable>
            </Fragment>
        );
    }
}

export default connect(AddContractType.mapStateToProps)(AddContractType);