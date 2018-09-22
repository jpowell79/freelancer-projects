import React, {Component, Fragment} from "react";
import SortableTable from "../../containers/SortableTable";
import {connect} from "react-redux";
import AddContractTypeForm from "../forms/AddContractTypeForm";
import strings from "../../../services/datatypes/strings";
import Dispatcher from "../../services/loaders/Dispatcher";
import AlertOptionPane from "../../services/Alert/AlertOptionPane";
import {Form} from "semantic-ui-react";
import {getErrorString} from "../../services/utils";
import subscriptions from "../../../services/api/subscriptions";

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

        return subscriptions.addContractType({
            name: messageState.contractType
        }).then(() => this.dispatcher.dispatchUpdateSubscriptionTypes({}))
            .then(() => {
                setMessageState({isLoading: false});
            })
            .catch(err => {
                setMessageState({
                    isLoading: false,
                    errors: [getErrorString(err)]
                });
            });
    };

    handleEdit = (event, removeAlert) => {
        if(!strings.isDefined(this.state.contractType.name)){
            AlertOptionPane.showErrorAlert({
                message: "The field cannot be empty"
            });

            return;
        }

        removeAlert();

        return subscriptions.editContractType({
            name: this.state.contractType.name,
            id: this.state.contractType.id
        }).then(() => this.dispatcher.dispatchUpdateSubscriptionTypes({}))
            .catch(err => {
                AlertOptionPane.showErrorAlert({
                    message: getErrorString(err)
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
            confirmText: "Submit",
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