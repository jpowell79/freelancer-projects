import React, {Component, Fragment} from "react";
import {compose} from "redux";
import withMessage from "../../hocs/withMessage";
import {roles} from "../../../services/constants";
import {connect} from "react-redux";
import users from "../../../services/api/users";
import DatabaseDataLoader from "../../services/loaders/DatabaseDataLoader";
import {SuspendTable} from "../SuspendTable";
import AlertOptionPane from "../../services/Alert/AlertOptionPane";

class SuspendSuppliers extends Component {
    static mapStateToProps = ({users}) => ({
        suppliers: users.filter(user => user.role === roles.supplier)
    });

    suspend = async (username) => {
        return this.props.setClearedMessageState({isLoading: true})
            .then(() => users.suspendSupplier({username}))
            .then(() => new DatabaseDataLoader(this.props.dispatch, {
                users: true,
                suspendedUsers: true
            }).loadFromClientSide())
            .then(() => this.props.setMessageState({
                isLoading: false,
                showSuccess: true,
                successTitle: "The supplier was suspended successfully."
            }))
            .catch(err => this.props.setStandardErrorState(err));
    };

    confirmSuspend = async (username) => {
        AlertOptionPane.showWarningAlert({
            title: `Do you really want to suspend ${username}?`,
            message: `All information related to ${username} will be removed if you do this.`,
            onConfirm: (event, removeAlert) => {
                removeAlert();
                return this.suspend(username);
            },
            onCancel: (event, removeAlert) => removeAlert()
        });
    };

    render(){
        return (
            <Fragment>
                <h2>Suspend Suppliers</h2>
                {this.props.renderMessages()}
                <SuspendTable
                    isLoading={this.props.messageState.isLoading}
                    suppliers={this.props.suppliers}
                    thead={[<th key={0} className="no-sort"> </th>]}
                    renderTd={(supplier) => (
                        <td>
                            <button
                                className="ui bg-color-uiRed color-white button"
                                onClick={() => this.confirmSuspend(supplier.username)}>
                                Suspend
                            </button>
                        </td>
                    )}
                />
            </Fragment>
        );
    }
}

export default compose(
    withMessage,
    connect(SuspendSuppliers.mapStateToProps)
)(SuspendSuppliers);