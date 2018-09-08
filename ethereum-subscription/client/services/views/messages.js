import etherscan from "../../../services/api/etherscan";

export const waitingForBlockchain = {
    infoTitle: 'Waiting for transaction confirmation',
    info: [
        'Please allow up to 30 seconds for the transaction to ' +
        'be processed and written to the Ethereum blockchain.'
    ]
};

export const getTransactionMessage = (
    transaction,
    etherScanUrl,
    title = "The transaction completed successfully!"
) => {
    console.log(transaction);

    return {
        successTitle: title,
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