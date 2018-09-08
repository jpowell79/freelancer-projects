import React, {Component, Fragment} from 'react';
import {roles} from '../../../services/constants';
import AlertOptionPane from "../../services/Alert/AlertOptionPane";
import SortableTable from "../../containers/SortableTable";
import {LoaderSmall} from "../../modules/icons";
import {hideOnMobile} from "../../services/constants/css";
import {getErrorString} from "../../services/utils";
import {connect} from 'react-redux';
import users from '../../../services/api/users';

class SuspendSuppliers extends Component {
    static mapStateToProps = ({users}) => ({
        suppliers: users.filter(user => user.role === roles.supplier)
    });

    constructor(props){
        super(props);

        this.state = {
            suppliers: props.suppliers
        }
    }

    showSuccessAlert = (supplier) => {
        AlertOptionPane.showSuccessAlert({
            message: `Supplier ${supplier.username} was suspended successfully.`,
            onConfirm: (removeAlert) => {
                window.location.reload();
                removeAlert();
            }
        })
    };

    showSuspendAlert = (supplier) => {
        AlertOptionPane.showErrorAlert({
            title: `Suspend ${supplier.username}`,
            message: `Do you really want to suspend ${supplier.username}?`,
            onConfirm: (event, removeAlert) => {
                removeAlert();
                this.setState({isLoading: true});

                users.suspendSupplier({username: supplier.username})
                    .then(() => {
                        this.showSuccessAlert(supplier);
                        this.setState({isLoading: false});
                    }).catch(err => {
                        AlertOptionPane.showErrorAlert({
                            message: getErrorString(err)
                        });
                        this.setState({isLoading: false});
                    });
            },
            onCancel: (event, removeAlert) => {removeAlert();}
        });
    };

    renderSuppliers = () => {
        return this.state.suppliers.map((supplier, i) => {
            return (
                <tr key={i}>
                    <td>{supplier.username}</td>
                    <td style={{wordBreak: "break-all"}}>{supplier.email}</td>
                    <td className={hideOnMobile()}>{supplier.rating}</td>
                    <td>
                        <button
                            className="ui bg-color-uiRed color-white button"
                            onClick={() => {
                                this.showSuspendAlert(supplier);
                            }}>
                            Suspend
                        </button>
                    </td>
                </tr>
            );
        });
    };

    render(){
        return (
            <Fragment>
                <h2>Suspend Suppliers</h2>
                <SortableTable>
                    <thead>
                        <tr>
                            <th>Username:</th>
                            <th>Email:</th>
                            <th className={hideOnMobile()}>Rating:</th>
                            <th className="no-sort"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.isLoading)
                            ? (
                                <tr className="text-center">
                                    <td colSpan={4}>
                                        <LoaderSmall/>
                                    </td>
                                </tr>
                            ) : (
                                this.renderSuppliers()
                            )
                        }
                    </tbody>
                </SortableTable>
            </Fragment>
        );
    }
}

export default connect(SuspendSuppliers.mapStateToProps)(SuspendSuppliers);