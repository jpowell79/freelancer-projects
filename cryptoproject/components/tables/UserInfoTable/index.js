import React, {Component} from 'react';
import {definitionTable} from "../../../services/cssUtils/index";
import {connect} from 'react-redux';
import {LoaderSmall} from "../../icons/index";
import Dispatcher from '../../../services/Dispatcher/index';

class UserInfoTable extends Component {
    static defaultProps = {
        tableClass: definitionTable()
    };

    componentDidMount(){
        new Dispatcher(this.props.dispatch).updateAccount();
    }

    render(){
        let {account} = this.props;

        return (
            <table className={this.props.tableClass}>
                {(account.isLoading)
                    ? (
                        <tbody>
                            <tr>
                                <td colSpan={2}><LoaderSmall/></td>
                            </tr>
                        </tbody>
                    )
                    : (
                        <tbody>
                            <tr>
                                <td className="six wide column">
                                    We have detected that your Ethereum address is:
                                </td>
                                <td>
                                    {account.address}
                                </td>
                            </tr>
                            <tr>
                                <td className="six wide column">
                                    Your Eth balance is currently:
                                </td>
                                <td>
                                    {account.balance}
                                </td>
                            </tr>
                            <tr>
                                <td className="six wide column">
                                    Your TEST123 token balance is currently:
                                </td>
                                <td>
                                    {account.tradeTokens}
                                </td>
                            </tr>
                            <tr>
                                <td className="six wide column">
                                    You appear to be connected to:
                                </td>
                                <td>
                                    {account.network} network
                                </td>
                            </tr>
                        </tbody>
                    )
                }
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    let {account} = state;

    return {account};
};

export default connect(mapStateToProps)(UserInfoTable);