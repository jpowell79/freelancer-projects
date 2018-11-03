import React, {Component, Fragment} from "react";
import {compose} from "redux";
import Page from "../site-components/containers/Page";
import withContracts from "../site-components/hocs/withContracts";
import withMetamaskAccount from "../components/hocs/withMetamaskAccount";
import {updateTemplateContract} from "../redux/actions";
import {parseErrorString} from "../services/utils";
import AlertOptionPane from "../components/Alert/AlertOptionPane";
import Alerts from "../site-components/Alerts";
import Dispatcher from "../services/Dispatcher";
import GuessForm from "../site-components/GuessForm";
import {GameDetails} from "../site-components/GameDetails";
import {AdSidebar} from "../site-components/AdSidebar";
import {LoginMessage} from "../site-components/LoginMessage";
import settings from "../settings";
import {StartNewGame} from "../site-components/StartNewGame";

class Index extends Component {
    constructor(props){
        super();

        this.defaultGuess = (props.templateContract.lowValue + (
            props.templateContract.highValue - props.templateContract.lowValue - 1
        ) / 2).toFixed(0);
    }

    componentDidMount(){
        this.props.addContractUpdateTimer();
    }

    timerIsStopped = () => {
        return Date.now() > this.props.templateContract.gameEndTime;
    };

    handleGuess = async (guess) => {
        return this.props.templateContractRequest.makeGuess({
            guessedNumber: guess,
            walletAddress: this.props.metamaskAccount.address
        }).then((transaction) => this.handleTransaction(transaction, parseInt(guess, 10)))
            .catch(this.handleTransactionError);
    };

    handleTransactionError = (err) => {
        console.error(err);

        AlertOptionPane.showErrorAlert({
            title: "Transaction Error",
            message: parseErrorString(err)
        });
    };

    handleTransaction = async (transaction, guess) => {
        return this.props.templateContractRequest.fetch()
            .then(templateContract => {
                this.props.dispatch(updateTemplateContract(templateContract));

                Alerts.showGuessResults(transaction, this.props.templateContract, guess);

                if(this.gameIsOver()){
                    return this.handleGameOver();
                }
            });
    };

    handleGameOver = async () => {
        return Dispatcher.updateContracts(this.props.dispatch);
    };

    gameIsOver = () => {
        const {templateContract} = this.props;

        return (
            templateContract.nextGuess > 1 &&
            templateContract.gameEndTime > 0 &&
            Date.now() > templateContract.gameEndTime
        ) || templateContract.guessedCorrectly;
    };

    calcDefaultGuess = () => {
        return (this.props.templateContract.lowValue + (
            this.props.templateContract.highValue - this.props.templateContract.lowValue - 1
        ) / 2).toFixed(0);
    };

    render () {
        const {factoryContract, templateContract, metamaskAccount} = this.props;
        const isLoggedIntoMetamask = Object.keys(metamaskAccount).length > 0;

        return (
            <Page sidebar={<AdSidebar/>}>
                <div className="glass container bg-color-white br-5">
                    <h2 className="display-6">
                        <a href={`${settings.etherscanUrl}/address/${templateContract.address}`}
                            target="_blank">
                            Game Number {factoryContract.count}
                        </a>
                    </h2>
                    {(this.gameIsOver()) ? (
                        <StartNewGame
                            metamaskAddress={metamaskAccount.address}
                            gameWinner={templateContract.lastGuessAddress}
                            onClick={() => this.props.templateContractRequest
                                .startNewGame(metamaskAccount.address)
                                .then(transaction => Alerts.showNewGameCreated(transaction))
                                .then(() => Dispatcher.updateContracts(this.props.dispatch))
                                .catch(this.handleTransactionError)
                            }
                        />
                    ) : (
                        <Fragment>
                            <GameDetails
                                {...templateContract}
                                metamaskAddress={metamaskAccount.address}
                                counterIsStopped={this.timerIsStopped()}
                                onCounterStop={this.handleGameOver}
                            />
                            {(!isLoggedIntoMetamask) ? (
                                <div className="wrapper-4">
                                    <LoginMessage/>
                                </div>
                            ) : (
                                <GuessForm
                                    defaultGuess = {this.calcDefaultGuess()}
                                    onGuess={(guess) => this.handleGuess(guess)}
                                    {...templateContract}
                                />
                            )}
                        </Fragment>
                    )}
                </div>
            </Page>
        )
    }
}

export default compose(withMetamaskAccount, withContracts)(Index);