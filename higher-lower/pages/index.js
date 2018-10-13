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

        this.state = {
            counterIsStopped: Date.now() > props.templateContract.gameEndTime
        };

        this.defaultGuess = (props.templateContract.lowValue + (
            props.templateContract.highValue - props.templateContract.lowValue - 1
        ) / 2).toFixed(0);
    }

    componentDidMount(){
        this.props.addContractUpdateTimer();
    }

    timerShouldStop = () => {
        return Date.now() > this.props.templateContract.gameEndTime;
    };

    handleGuess = async (guess) => {
        return this.props.templateContractRequest.makeGuess({
            guessedNumber: guess,
            walletAddress: this.props.metamaskAccount.address
        }).then((transaction) => this.handleTransaction(transaction, parseInt(guess, 10)))
            .catch(err => {
                AlertOptionPane.showErrorAlert({
                    title: "Transaction Error",
                    message: parseErrorString(err)
                });
            });
    };

    handleTransaction = async (transaction, guess) => {
        return this.props.templateContractRequest.fetch()
            .then(templateContract => {
                this.props.dispatch(updateTemplateContract(templateContract));

                this.setState({
                    counterIsStopped: this.timerShouldStop()
                });

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

        return templateContract.nextGuess > 15 ||
            (templateContract.guessedCorrectly) ||
            templateContract.gameEndTime < Date.now()
    };

    render () {
        const {factoryContract, templateContract, metamaskAccount} = this.props;
        const isLoggedIntoMetamask = Object.keys(metamaskAccount).length > 0;

        return (
            <Page sidebar={<AdSidebar/>}>
                <div className="glass container bg-color-white br-5">
                    <h2 className="display-6">
                        <a href={`${settings.etherscanUrl}/address/${factoryContract.address}`}
                            target="_blank">
                            Game Number {factoryContract.count}
                        </a>
                    </h2>
                    {(!isLoggedIntoMetamask) ? (
                        <div className="wrapper-4">
                            <LoginMessage/>
                        </div>
                    ) : (this.gameIsOver()) ? (
                        <StartNewGame
                            metamaskAddress={metamaskAccount.address}
                            gameWinner={templateContract.lastGuessAddress}
                            onClick={() => this.props.templateContractRequest
                                .startNewGame(metamaskAccount.address)
                                .catch(console.error)
                            }
                        />
                    ) : (
                        <Fragment>
                            <GameDetails
                                {...templateContract}
                                counterIsStopped={this.state.counterIsStopped}
                                onCounterStop={() => this.setState({counterIsStopped: true})}
                            />
                            <GuessForm
                                defaultGuess={this.defaultGuess}
                                onGuess={(guess) => this.handleGuess(guess)}
                                {...templateContract}
                            />
                        </Fragment>
                    )}
                </div>
            </Page>
        )
    }
}

export default compose(withMetamaskAccount, withContracts)(Index);