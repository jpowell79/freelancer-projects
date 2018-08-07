import React, {Component, Fragment} from 'react';
import SortableTable from "../../modules/SortableTable";
import {connect} from 'react-redux';
import AddContractTypeForm from "../forms/AddContractTypeForm";
import axios from 'axios';
import strings from '../../../services/strings';
import {urls} from '../../../services/constants';
import Dispatcher from '../../services/Dispatcher';
import AlertOptionPane from "../../services/Alert/AlertOptionPane";
import {Form} from 'semantic-ui-react';

class AddContractType extends Component {
    static mapStateToProps = ({subscriptionTypes}) => ({subscriptionTypes});

    state = {
        contractType: {}
    };

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

    handleEdit = (event, removeAlert) => {
        if(!strings.isDefined(this.state.contractType.name)){
            AlertOptionPane.showErrorAlert({
                message: 'The field cannot be empty'
            });

            return;
        }

        removeAlert();

        return axios.post(urls.subscriptionTypes, {
            name: this.state.contractType.name,
            id: this.state.contractType.id,
            update: true
        }).then(() => this.dispatcher.dispatchUpdateSubscriptionTypes({}))
            .catch(err => {
                AlertOptionPane.showErrorAlert({
                    message: err.toString()
                });
            });
    };

    showEditContractTypeAlert = (type) => {
        this.setState({contractType: type});

        AlertOptionPane.showPlainAlert({
            title: `Edit ${type.name}`,
            htmlMessage: (
                <Form>
                    <Form.Field>
                        <input
                            type="text"
                            defaultValue={type.name}
                            onChange={(event) => {
                                this.setState({
                                    contractType: {
                                        name: event.target.value,
                                        id: type.id
                                    }
                                });
                            }}
                        />
                    </Form.Field>
                </Form>
            ),
            confirmText: 'Submit',
            onConfirm: this.handleEdit,
            onCancel: (event, removeAlert) => {removeAlert();}
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
                        <th className="no-sort" style={{
                            width: "1%",
                            whiteSpace: "nowrap"
                        }}> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.subscriptionTypes.map((type, i) => {
                        return (
                            <tr key={i}>
                                <td>{type.id}</td>
                                <td>{type.name}</td>
                                <td>
                                    <button
                                        className="ui bg-color-uiBlue color-white button"
                                        onClick={() => {this.showEditContractTypeAlert(type)}}
                                    >
                                        Edit
                                    </button>
                                </td>
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