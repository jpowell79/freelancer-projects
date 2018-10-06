import React, {Fragment} from "react";
import AlertOptionPane from "../components/Alert/AlertOptionPane";
import settings from "../settings";

const TransactionHash = ({transaction}) => {
    return (
        <Fragment>
            <p className="bold mb-0">Transaction Hash:</p>
            <p className="bold"><a
                target="_blank"
                style={{wordBreak: "break-all"}}
                href={`${settings.etherscanUrl}/tx/${transaction.transactionHash}`
                }>{transaction.transactionHash}</a></p>
        </Fragment>
    );
};

class Alerts {
    static showGuessResults(transaction, templateContract){
        if(templateContract.lowValue === templateContract.highValue){
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
                    <TransactionHash transaction={transaction}/>
                    {(templateContract.nextGuess < 15)
                        ? (
                            <p>
                                Unlucky! It looks like you didn’t guess the number correctly.
                                Don’t worry, if the countdown timer reaches 00:00 and nobody else
                                makes a guess, you’ll win all the Eth in the contract anyway!
                            </p>
                        ) : (
                            <p>
                                Unlucky! It looks like you didn’t guess the number correctly.
                                As a consolation we are going to refund you your Eth automagically!
                                We hope you enjoyed playing, and hope you’ll join us for the next
                                game!
                            </p>
                        )}
                </div>
            )
        })
    }
}

export default Alerts;