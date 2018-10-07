import React, {Component} from "react";
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
            (templateContract.highValue === templateContract.lowValue)
    };

    render () {
        const {factoryContract, templateContract, metamaskAccount} = this.props;

        const isLoggedIntoMetamask = Object.keys(metamaskAccount).length > 0;

        return (
            <Page sidebar={<AdSidebar/>}>
                <div className="glass container bg-color-white">
                    <h2 className="display-6">Game Number {factoryContract.count}</h2>
                    <GameDetails
                        {...templateContract}
                        counterIsStopped={this.state.counterIsStopped}
                        onCounterStop={() => this.setState({counterIsStopped: true})}
                    />
                    {isLoggedIntoMetamask ? (
                        <GuessForm
                            defaultGuess={this.defaultGuess}
                            onGuess={(guess) => this.handleGuess(guess)}
                            {...templateContract}
                        />
                    ) : (
                        <div className="wrapper-4">
                            <LoginMessage/>
                        </div>
                    )}
                </div>
            </Page>
        )
    }
}

export default compose(withMetamaskAccount, withContracts)(Index);