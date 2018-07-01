import React, {Component} from 'react';
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
import Paths from "../../../../services/Paths/index";

class AccountDetails extends Component {
    constructor(props){
        super(props);

        this.renderAccountDetails = this.renderAccountDetails.bind(this);
    }

    componentDidMount() {
        new Dispatcher(this.props.dispatch).updateAccount();
    }

    renderAccountDetails(){
        const {account} = this.props;

        return (
            <div className={twoColumnGrid()}>
                <div className="column">
                    <div className="icon-item">
                        <AddressCard/>
                        <div className="content">
                            <h3>Ethereum Address</h3>
                            <div style={{wordBreak: "break-all"}}>
                                <a href={Paths.getEtherScanUrl(account.address)}>{
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
                            <h3>TEST123 Token Balance</h3>
                            <div>
                                {account.tradeTokens}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {account} = this.props;

        return (
            <div id="account-details">
                {(account.isLoading)
                    ? (
                        <LoaderSmall/>
                    )
                    : (
                        this.renderAccountDetails()
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