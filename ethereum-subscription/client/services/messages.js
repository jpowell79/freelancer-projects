import etherscan from "../../services/etherscan";

export const waitingForBlockchain = {
    infoTitle: 'Waiting for transaction confirmation',
    info: [
        'Please allow up to 30 seconds for the transaction to ' +
        'be processed and written to the Ethereum blockchain.'
    ]
};

export const getTransactionMessage = (transaction, etherScanUrl) => {
    console.log(transaction);

    return {
        successTitle: "The transaction completed successfully!",
        success: [
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
            </li>
        ]
    };
};