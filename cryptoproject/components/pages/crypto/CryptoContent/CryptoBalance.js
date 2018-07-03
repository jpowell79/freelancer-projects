import React, {Component} from 'react';
import {connect} from 'react-redux';
import {resetAccount} from "../../../../redux/actions";
import {LoaderSmall} from "../../../modules/icons/index";
import {
    definitionTable,
    titledSegmentHeader,
    titledSegmentContent
} from "../../../../services/cssUtils/index";
import Dispatcher from '../../../../services/Dispatcher/index';
import Paths from "../../../../services/Paths";

class CryptoBalance extends Component {
    componentWillUnmount(){
        this.props.dispatch(resetAccount());
    }

    componentDidMount(){
        new Dispatcher(this.props.dispatch).updateAccount();
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
                                            <a href={Paths.getEtherScanUrl(account.address)}>{
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
                                    ? "Please check your connection to metamask."
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