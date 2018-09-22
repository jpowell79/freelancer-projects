import React from "react";
import AlertOptionPane from "../Alert/AlertOptionPane";
import AddSubscriptionForm from "../../site-modules/forms/AddSubscriptionForm";
import etherscan from "../../../services/api/etherscan";
import {Message} from "semantic-ui-react";

const defaultOptions = {};

export const showTransactionAlert = ({
    transaction,
    etherScanUrl,
    messageHeader = "The transaction completed successfully!",
    messageList = []
}, options = defaultOptions) => {
    const mergedOptions = Object.assign({}, defaultOptions, options);
    console.log(transaction);

    AlertOptionPane.showSuccessAlert({
        ...mergedOptions,
        titleIcon: (mergedOptions.titleIcon) ? mergedOptions.titleIcon : null,
        message: (mergedOptions.message)
            ? mergedOptions.message
            : "The transaction was completed successfully",
        htmlMessage: (
            <Message
                header={messageHeader}
                list={[
                    <li key={transaction.transactionHash}>
                        Transaction Hash: <p className="bold"><a
                        target="_blank"
                        style={{
                            wordBreak: "break-all"
                        }}
                        href={
                            etherscan.getTransactionUrl(
                                etherScanUrl,
                                transaction.transactionHash
                            )
                        }>{transaction.transactionHash}</a></p>
                    </li>,
                    ...messageList
                ]}
            />
        )
    });
};

export const showAddSubscriptionFormAlert = (options = defaultOptions) => {
    const mergedOptions = Object.assign({}, defaultOptions, options);

    AlertOptionPane.showSuccessAlert({
        ...mergedOptions,
        titleIcon: (mergedOptions.titleIcon) ? mergedOptions.titleIcon : null,
        title: (mergedOptions.title)
            ? mergedOptions.title
            : `Subscribe to ${mergedOptions.contract.subscriptionName}`,
        htmlMessage: <AddSubscriptionForm {...mergedOptions}/>,
        onCancel: (mergedOptions.onCancel)
            ? mergedOptions.onCancel
            : (event, removeAlert) => removeAlert(),
    });
};

export default {
    showTransactionAlert,
    showAddSubscriptionFormAlert
}