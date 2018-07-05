import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LoaderSmall} from "../../../modules/icons/index";
import {
    definitionTable,
    titledSegmentHeader,
    titledSegmentContent
} from "../../../../services/cssUtils/index";
import Dispatcher from '../../../../services/Dispatcher/index';
import Paths from "../../../../services/Paths";

class CryptoBalance extends Component {
    componentDidMount(){
        this.dispatcher = new Dispatcher(this.props.dispatch);
        this.dispatcher.updateAccount();
        this.dispatcher.subscribeToAccountUpdate({
            getCompareAddress: () => this.props.account.address
        });
    }

    componentWillUnmount(){
        this.dispatcher.unsubscribe();
    }

    render(){
        let {account} = this.props;

        if(account.isLoading){
            return (
                <section id="crypto-balance">
                    <div className="ui top attached padded bg-color-light-gray header">
                        <h2>Your account</h2>
                    </div>
                    <div className="ui attached padded segment children-divider-2">
                        <LoaderSmall/>
                    </div>
                </section>
            );
        }

        return (
            <section id="crypto-balance">
                <div className={titledSegmentHeader()}>
                    <h2>Your account</h2>
                </div>
                <div className={titledSegmentContent('children-divider-2')}>
                    <table className={definitionTable()}>
                        <tbody>
                            <tr>
                                <td className="four wide column">
                                    Ethereum address:
                                </td>
                                <td>
                                    {(account.address === null)
                                        ? 'Could not be detected.'
                                        : (
                                            <a href={Paths.getEtherScanAddressUrl(account.address)} target="_blank">{
                                                account.address
                                            }</a>
                                        )}
                                </td>
                            </tr>
                            <tr>
                                <td className="four wide column">
                                    Trade tokens:
                                </td>
                                <td>
                                    {account.tradeTokens}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {(account.tradeTokens > 0)
                        ? (
                            <div className="ui success message">
                                You are eligible to trade during the extended trading period.
                            </div>
                        )
                        : (
                            <div className="ui error message">
                                {(account.address === null)
                                    ? "Please check the connection to your ethereum account."
                                    : "You are not eligible to trade during the extended trading period."}
                            </div>
                        )}
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    let {account} = state;

    return {account};
};

export default connect(mapStateToProps)(CryptoBalance);