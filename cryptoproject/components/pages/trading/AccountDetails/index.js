import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {LoaderSmall} from "../../../modules/icons/index";
import Dispatcher from '../../../../services/Dispatcher/index';
import {twoColumnGrid} from "../../../../services/cssUtils/index";
import {
    AddressCard,
    Ethereum,
    Plug,
    MoneyBill
} from "../../../modules/icons/index";
import Settings from '../../../../site-settings';
import Paths from "../../../../services/Paths/index";
import Strings from "../../../../services/Strings/index";

class AccountDetails extends Component {
    static defaultProps = {
        titleElement: null,
        renderer: null,
        onErrorRenderer: () => {
            return (
                <p className="h3">
                    We were unable to detect your ethereum account.
                </p>
            );
        }
    };

    constructor(props){
        super(props);

        this.renderAccountDetails = this.renderAccountDetails.bind(this);
    }

    componentDidMount() {
        this.dispatcher = new Dispatcher(this.props.dispatch);
        this.dispatcher.updateAccount();
        this.dispatcher.subscribeToAccountUpdate({
            getCompareAddress: () => this.props.account.address
        });
    }

    componentWillUnmount(){
        this.dispatcher.unsubscribe();
    }

    renderAccountDetails(){
        const {
            account,
            titleElement
        } = this.props;

        return (
            <Fragment>
                {titleElement}
                <div className={twoColumnGrid()}>
                    <div className="column">
                        <div className="icon-item">
                            <AddressCard/>
                            <div className="content">
                                <h3>Ethereum Address</h3>
                                <div style={{wordBreak: "break-all"}}>
                                    <a href={Paths.getEtherScanAddressUrl(account.address)} target="_blank">{
                                        account.address
                                    }</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="icon-item">
                            <Plug/>
                            <div className="content">
                                <h3>Network Connection</h3>
                                <div>
                                    {account.network}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="icon-item">
                            <Ethereum/>
                            <div className="content">
                                <h3>Eth Balance</h3>
                                <div>
                                    {account.balance}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="icon-item">
                            <MoneyBill className="display-5"/>
                            <div className="content">
                                <h3>{Settings.TOKEN_NAME} Token Balance</h3>
                                <div>
                                    {account.tradeTokens}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    render() {
        const {account} = this.props;

        const renderer = (this.props.renderer !== null)
            ? this.props.renderer : this.renderAccountDetails;

        return (
            <div id="account-details">
                {(account.isLoading)
                    ? (
                        <LoaderSmall/>
                    )
                    : (Strings.isDefined(account.address))
                        ? (
                            renderer(account, this.renderAccountDetails)
                        ) : (
                            this.props.onErrorRenderer()
                        )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let {account} = state;

    return {account};
};

export default connect(mapStateToProps)(AccountDetails);