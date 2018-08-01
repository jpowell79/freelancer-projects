import React, {Component, Fragment} from 'react';
import {urls, roles} from '../../../services/constants';
import axios from 'axios';
import AlertOptionPane from "../../services/Alert/AlertOptionPane";
import SortableTable from "../../modules/SortableTable";
import {LoaderSmall} from "../../modules/icons";
import {hideOnMobile} from "../../services/css";

class SuspendSuppliers extends Component {
    constructor(props){
        super(props);

        this.state = {
            suppliers: [],
            isLoading: false
        }
    }

    componentDidMount(){
        axios.get(urls.users)
            .then(userResponse => userResponse.data)
            .then(users => users.filter(user => user.role === roles.supplier))
            .then(suppliers => {
                this.setState({
                    suppliers,
                    isLoading: false
                });
            })
            .catch(err => {
                AlertOptionPane.showErrorAlert({
                    message: err.toString()
                });
            });
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

                axios.delete(urls.users, {
                    params: {username: supplier.username}
                }).then(() => {
                    this.showSuccessAlert(supplier);
                    this.setState({isLoading: false});
                }).catch(err => {
                    AlertOptionPane.showErrorAlert({
                        message: err.toString()
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

export default SuspendSuppliers;