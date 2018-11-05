import React, {Component, Fragment} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import withMessage from "../../hocs/withMessage";
import users from "../../../services/api/users";
import DatabaseDataLoader from "../../services/loaders/DatabaseDataLoader";
import {SuspendTable} from "../SuspendTable";

class UnsuspendSuppliers extends Component {
    static mapStateToProps = ({suspendedUsers}) => ({suspendedUsers});

    state = {
        isLoading: false
    };

    handleUnsuspend = (username) => {
        return this.props.setClearedMessageState({isLoading: true})
            .then(() => users.unsuspendSupplier({username}))
            .then(() => new DatabaseDataLoader(this.props.dispatch, {
                users: true,
                suspendedUsers: true
            }).loadFromClientSide())
            .then(() => this.props.setMessageState({
                    isLoading: false,
                    showSuccess: true,
                    successTitle: "The supplier was unsuspended successfully!"
            }))
            .catch(err => this.props.setStandardErrorState(err))
    };

    render(){
        return (
            <Fragment>
                <h2>Unsuspend Suppliers</h2>
                {this.props.renderMessages()}
                <SuspendTable
                    isLoading={this.props.messageState.isLoading}
                    suppliers={this.props.suspendedUsers}
                    thead={[<th key={0} className="no-sort"> </th>]}
                    renderTd={(supplier) => (
                        <td>
                            <button
                                className="ui bg-color-uiRed color-white button"
                                disabled={this.props.messageState.isLoading}
                                onClick={() => this.handleUnsuspend(supplier.username)}>
                                Unsuspend
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
    connect(UnsuspendSuppliers.mapStateToProps)
)(UnsuspendSuppliers);