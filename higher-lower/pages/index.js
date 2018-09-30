import React, {Component, Fragment} from "react";
import Page from "../site-components/containers/Page";
import {AdContainer} from "../site-components/containers/AdContainer";
import withContracts from "../site-components/hocs/withContracts";
import {compose} from "redux";
import Counter from "../external-components/react-flip-counter";
import {Address} from "../site-components/Address";
import withMetamaskAccount from "../components/hocs/withMetamaskAccount";

class Index extends Component {
    render () {
        const {
            factoryContract,
            templateContract,
            templateContractRequest,
            metamaskAccount
        } = this.props;

        return (
            <Page
                sidebar={
                    <Fragment>
                        <AdContainer className="bg-color-bBlue">
                            <div className="display-5" style={{maxWidth: "250px", margin: "0 auto"}}>
                                YOUR AD HERE:
                                MOBILE 300x250
                            </div>
                        </AdContainer>
                        <AdContainer className="bg-color-bBlue">
                            <div className="display-5" style={{maxWidth: "250px", margin: "0 auto"}}>
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
                <Counter
                    onStop={() => console.log("Stopped")}
                    stop={new Date(templateContract.gameEndTime)}
                />
                <h3>
                    Eth currently stored in this contract: {templateContract.balance}
                </h3>
                <h3>
                    Remember, if you guess incorrectly, you will still win the Eth if the
                    countdown timer reaches zero!
                </h3>
                <input type="text"/>
                <button onClick={() => {
                    return templateContractRequest.makeGuess({
                        number: 0,
                        walletAddress: metamaskAccount.address
                    });
                }}>Guess</button>
            </Page>
        )
    }
}

export default compose(
    withMetamaskAccount,
    withContracts
)(Index);