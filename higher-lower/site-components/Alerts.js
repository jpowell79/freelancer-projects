import React, {Fragment} from "react";
import AlertOptionPane from "../components/Alert/AlertOptionPane";
import settings from "../settings";

const TransactionHash = ({transaction}) => {
    return (
        <Fragment>
            <p className="mb-0">Transaction Hash:</p>
            <p className="lighter"><a
                target="_blank"
                style={{wordBreak: "break-all"}}
                href={`${settings.etherscanUrl}/tx/${transaction.transactionHash}`
                }>{transaction.transactionHash}</a></p>
        </Fragment>
    );
};

class Alerts {
    static showGuessResults(transaction, templateContract, guess){
        if((guess === templateContract.lowValue) && (guess === templateContract.highValue)){
            return AlertOptionPane.showSuccessAlert({
                title: "You guessed correctly!",
                titleIcon: null,
                htmlMessage: (
                    <div>
                        <p>
                            Congratulations! You guess correctly, and all the Eth stored in this
                            smart contract will now be heading your way! We hope you enjoyed
                            playing, and hope you will join us for the next game!
                        </p>
                        <TransactionHash transaction={transaction}/>
                    </div>
                )
            });
        }

        return AlertOptionPane.showErrorAlert({
            title: "You guessed incorrectly",
            titleIcon: null,
            htmlMessage: (
                <div>
                    {(templateContract.nextGuess < 15)
                        ? (
                            <Fragment>
                                <p>Unlucky! It looks like you didn’t guess the number correctly.</p>
                                <p>
                                    Don’t worry, if the countdown timer reaches 00:00 and nobody else
                                    makes a guess, you’ll win all the Eth in the contract anyway!
                                </p>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <p>Unlucky! It looks like you didn’t guess the number correctly.</p>
                                <p>
                                    As a consolation we are going to refund you your Eth automagically!
                                    We hope you enjoyed playing, and hope you’ll join us for the next
                                    game!
                                </p>
                            </Fragment>
                        )}
                    <TransactionHash transaction={transaction}/>
                </div>
            )
        })
    }
}

export default Alerts;