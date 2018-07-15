import React, {Component, Fragment} from 'react';
import contract from "../../../../server/services/contract";
import Paths from "../../../../services/Paths";
import Strings from "../../../../services/Strings";
import Dispatcher from "../../../../services/Dispatcher";
import {LOWEST_ETH} from "../../../../site-settings";
import {connect} from "react-redux";
import PositiveFloatInput from "../../../modules/forms/PositiveFloatInput";
import {LoaderSmall} from "../../../modules/icons";

class TokenPurchase extends Component {
    constructor(props){
        super(props);

        this.purchaseStatus = {
            idle: "idle",
            inProgress: "inProgress",
            incorrectEth: "incorrectEth",
            notEnoughEth: "notEnoughEth",
            purchaseFailed: "purchaseFailed",
            success: "success",
            error: "error"
        };

        this.state = {
            hasCorrectInput: true,
            purchaseButtonIsDisabled: false,
            purchaseStatus: this.purchaseStatus.idle,
            purchaseValue: -1
        };

        this.handlePurchase = this.handlePurchase.bind(this);
        this.renderTransactionMessage = this.renderTransactionMessage.bind(this);
    }

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

    handlePurchase(event){
        event.preventDefault();

        const {
            inProgress,
            incorrectEth,
            notEnoughEth,
            purchaseFailed,
            success
        } = this.purchaseStatus;

        if(this.state.purchaseValue < LOWEST_ETH){
            this.setState({purchaseStatus: incorrectEth});
        } else if(this.props.account.balance < this.state.purchaseValue){
            this.setState({purchaseStatus: notEnoughEth});
        } else {
            this.setState({
                purchaseStatus: inProgress,
                purchaseButtonIsDisabled: true
            });

            contract.buyTokens({
                address: this.props.account.address,
                value: this.state.purchaseValue
            }).then(purchaseInfo => {
                this.purchase = purchaseInfo;
                return this.dispatcher.updateTokenSale();
            }).then(() => {
                this.setState({
                    purchaseStatus: success,
                    purchaseButtonIsDisabled: false
                });
            }).catch(err => {
                console.error(err);

                this.setState({
                    purchaseStatus: purchaseFailed,
                    purchaseButtonIsDisabled: false
                });
            });
        }
    }

    renderTransactionMessage(){
        const {
            inProgress,
            incorrectEth,
            notEnoughEth,
            purchaseFailed,
            success,
            error
        } = this.purchaseStatus;

        switch(this.state.purchaseStatus){
        case success:
            return (
                <div className="ui success message">
                    <div className="header">Your transaction has been approved!</div>
                    <span>Your transaction hash is </span>
                    <a href={`${Paths.getEtherScanTransactionUrl(this.purchase.transactionHash)}`} target="_blank">
                        {this.purchase.transactionHash}
                    </a>
                </div>
            );
        case inProgress:
            return (
                <div className="ui icon info message">
                    <div>
                        <LoaderSmall/>
                    </div>
                    <div className="content">
                        <div className="header">Waiting for transaction confirmation</div>
                        <span>
                            Please allow up to 30 seconds for the transaction to
                            be processed and written to the Ethereum blockchain.
                        </span>
                    </div>
                </div>
            );
        case purchaseFailed:
            return (
                <div className="ui error message">
                    <div className="header">Purchase Failed</div>
                    <span>
                        We were unable to process your purchase. Please ensure
                        your gas price, gas limit and Eth values are appropriate.
                    </span>
                </div>
            );
        case incorrectEth:
            return (
                <div className="ui error message">
                    Please correct the amount of Eth to a value greater than or equal to {LOWEST_ETH}
                </div>
            );
        case notEnoughEth:
            return (
                <div className="ui error message">
                    Please note that you require a minimum of {LOWEST_ETH} Eth to place a trade.
                </div>
            );
        case error:
            return (
                <div className="ui error message">
                    <div className="header">Purchase Cancelled</div>
                </div>
            );
        default:
            return null;
        }
    }

    render(){
        const {account} = this.props;

        return (
            (Strings.isDefined(account.address)) ? (
                <Fragment>
                    <div className={
                        (this.state.hasCorrectInput) ? "ui action input" : "ui action input error"
                    }>
                        <PositiveFloatInput
                            lowestDigit={LOWEST_ETH}
                            placeholder={`Min ${LOWEST_ETH} eth`}
                            onIncorrectInput={(event) => {
                                this.setState({hasCorrectInput: false});
                                event.preventDefault();
                            }}
                            onCorrectInput={(event) => {
                                this.setState({
                                    purchaseValue: event.target.value,
                                    hasCorrectInput: true
                                });
                            }}
                        />
                        <button
                            disabled={this.state.purchaseButtonIsDisabled}
                            className="ui primary submit button"
                            onClick={this.handlePurchase}>Purchase</button>
                    </div>
                    {this.renderTransactionMessage()}
                </Fragment>
            ) : !account.isLoading && (
                <div className="ui info message">
                    Login to your metamask account in order to purchase tokens.
                </div>
            )
        );
    }
}

const mapStateToProps = ({account}) => {
    return {account};
};

export default connect(mapStateToProps)(TokenPurchase);