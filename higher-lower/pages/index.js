import React, {Component, Fragment} from "react";
import Page from "../site-components/containers/Page";
import {AdContainer} from "../site-components/containers/AdContainer";
import withContracts from "../site-components/hocs/withContracts";
import {compose} from "redux";
import Counter from "../external-components/react-flip-counter";
import {Address} from "../site-components/Address";
import withMetamaskAccount from "../components/hocs/withMetamaskAccount";
import PositiveIntegerInput from "../components/PositiveIntegerInput";
import {updateTemplateContract} from "../redux/actions";
import {parseErrorString} from "../services/utils";
import AlertOptionPane from "../components/Alert/AlertOptionPane";
import HideFragment from "../components/HideFragment";
import Alerts from "../site-components/Alerts";
import {LoaderSmall, LoaderTiny} from "../components/icons";

class Index extends Component {
    constructor(props){
        super();

        this.state = {
            counterStopped: Date.now() > props.templateContract.gameEndTime,
            makingTransaction: false
        };

        this.guess = Math.round(
            (props.templateContract.highValue - props.templateContract.lowValue) / 2
        ).toString();
    }

    timerShouldStop = () => {
        return Date.now() > this.props.templateContract.gameEndTime;
    };

    handleGuess = () => {
        let transaction = {};

        this.setState({makingTransaction: true});

        return this.props.templateContractRequest.makeGuess({
            guessedNumber: this.guess,
            walletAddress: this.props.metamaskAccount.address
        }).then(transactionRes => {
            transaction = transactionRes;
            return this.props.templateContractRequest.fetch();
        }).then(templateContract =>{
            this.props.dispatch(updateTemplateContract(templateContract));
            this.setState({
                counterStopped: this.timerShouldStop(),
                makingTransaction: false
            });
            Alerts.showGuessResults(transaction, this.props.templateContract);
        }).catch(err => {
            AlertOptionPane.showErrorAlert({
                title: "Transaction Error",
                message: parseErrorString(err)
            });

            this.setState({makingTransaction: false});
        });
    };

    render () {
        const {
            factoryContract,
            templateContract
        } = this.props;

        return (
            <Page
                sidebar={
                    <Fragment>
                        <AdContainer className="bg-color-secondary">
                            <div className="display-4" style={{maxWidth: "250px", margin: "0 auto"}}>
                                YOUR AD HERE:
                                MOBILE 300x250
                            </div>
                        </AdContainer>
                        <AdContainer className="bg-color-secondary">
                            <div className="display-4" style={{maxWidth: "250px", margin: "0 auto"}}>
                                YOUR AD HERE:
                                MOBILE 300x250
                            </div>
                        </AdContainer>
                    </Fragment>
                }
            >
                <h2 className="display-6">Game Number {factoryContract.count}</h2>
                <h3>
                    The correct number is between {templateContract.lowValue} and {
                    templateContract.highValue}
                </h3>
                <h3>
                    The next guess will be guess {templateContract.nextGuess
                    } <p>
                        cost of next guess: {
                            (templateContract.costOfNextGuess === 0)
                                ? "FREE!"
                                : `${templateContract.costOfNextGuess} Eth`
                        }
                    </p>
                </h3>
                <h3>
                    The last Ethereum wallet address to make a guess was: <p>
                        <Address address={templateContract.lastGuessAddress}/>
                    </p>
                </h3>
                <div className="divider-2">
                    <HideFragment>
                        <Counter
                            isStopped={this.state.counterStopped}
                            onStop={() => {
                                console.log("Stopped");
                                this.setState({counterStopped: true})
                            }}
                            stop={new Date(templateContract.gameEndTime)}
                        />
                    </HideFragment>
                </div>
                <h3>
                    Eth currently stored in this contract: {templateContract.balance}
                </h3>
                <h3>
                    Remember, if you guess incorrectly, you will still win the Eth if the
                    countdown timer reaches zero!
                </h3>
                <div className="input-with-button divider-2">
                    <PositiveIntegerInput
                        lowestDigit={templateContract.lowValue}
                        highestDigit={templateContract.highValue}
                        defaultValue={this.guess}
                        disabled={this.state.makingTransaction}
                        onIncorrectInput={(event) => console.log(event.target.value)}
                        onCorrectInput={(event) => {
                            this.guess = event.target.value
                        }}
                    />
                    <button
                        className="button-secondary"
                        onClick={this.handleGuess}
                        disabled={this.state.makingTransaction}
                    >{(this.state.makingTransaction) ? <LoaderTiny/> : "Guess"}</button>
                </div>
            </Page>
        )
    }
}

export default compose(
    withMetamaskAccount,
    withContracts
)(Index);