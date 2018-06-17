#!/usr/bin/env bash
cd "$(dirname "$0")"

function printTitle {
    echo -e "------------------------------------------------------------------------"
    echo -e "$1"
    echo -e "------------------------------------------------------------------------"
}

function printEndOfSection {
    echo -e "------------------------------------------------------------------------\n"
}

function createFile {
    echo "Creating $1..."
    touch "$1"
}


function createContractDocument {
    cat > "$1" <<EOF
import web3 from '../../web3/';

const address = '0x6f0946722a105d5620044ee708e562ce84490218';

const abi =
    [{
        "constant": true,
        "inputs": [],
        "name": "extendedTimeCloses",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "checkCurrentBalance",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "cryptoWinnerRankAddress_14_25",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "potProcessorAddress_21_25",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "checkCryptoAddress",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "", "type": "uint256"}],
        "name": "totePlayers",
        "outputs": [{"name": "playerAddress", "type": "address"}, {
            "name": "betAmount",
            "type": "uint256"
        }, {"name": "timeStamp", "type": "uint256"}, {"name": "chosenCrypto", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "thisContractAddress",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_index", "type": "uint256"}],
        "name": "getAllPlayerEntryInfo",
        "outputs": [{"name": "playerAddress", "type": "address"}, {
            "name": "betAmount",
            "type": "uint256"
        }, {"name": "timeStamp", "type": "uint256"}, {"name": "chosenCrypto", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "cryptoWinnerRankAddress_01_13",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "index", "type": "uint256"}],
        "name": "getPlayerChosenCryptoByIndex",
        "outputs": [{"name": "chosenCrypto", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "showPotBalance",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "potProcessorAddress_16_20",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "index", "type": "uint256"}],
        "name": "getPlayerAddressByIndex",
        "outputs": [{"name": "playerAddress", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_index", "type": "uint256"}],
        "name": "getPlayerAddressAndAmountByIndex",
        "outputs": [{"name": "", "type": "address"}, {"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "potBalance",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "potManagerAddress",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "refillCryptoPriceContractGas",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "index", "type": "uint256"}],
        "name": "getPlayerBetAmountByIndex",
        "outputs": [{"name": "betAmount", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "enterTheGame",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "checkIsGamePaused",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "standardTimeCloses",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "cryptoPriceAddress",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "checkMaxBet",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "maxBalance",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "checkIsGameOpen",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "sendFundsToProcessor",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "masterUpdaterAddress_01_13",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "Price", "type": "address"}, {"name": "Pot", "type": "address"}],
        "name": "setPriceManagerAndPotManager",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "showCryptoName",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "priceManagerAddress",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "showCryptoPriceAddress",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "potProcessorAddress_11_15",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "rank",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "masterUpdaterAddress_14_25",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "potProcessorAddress_06_10",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "timeUntilGameCloses",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "numberOfTrades",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "potProcessorAddress_01_05",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "masterRefundAddress",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_index", "type": "uint256"}],
        "name": "refundIndividualPlayers",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "checkPercentageChange",
        "outputs": [{"name": "", "type": "int256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "showOverallWinnerRank",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "refundAllPlayers",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "updateReferences",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "processPayoutAddress",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "index", "type": "uint256"}],
        "name": "getPlayerTimestampByIndex",
        "outputs": [{"name": "timeStamp", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "showRank",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "showCryptoStartPrice",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "admin",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    }];

export default new web3.eth.Contract(abi, address);
EOF
}

printTitle "Generating Crypto Contracts"
cd components/crypto/contract
for i in `seq 4 9`
do
    createFile "crypto_0${i}_contract.js"
    createContractDocument "crypto_0${i}_contract.js"
done
for i in `seq 10 25`
do
    createFile "crypto_${i}_contract.js"
    createContractDocument "crypto_${i}_contract.js"
done
printEndOfSection


printTitle "Generating Crypto Pages"
cd ../../../pages/crypto

names=(
    "skipped" "bitcoin" "litecoin" "ripple" "nxt" "dogecoin" "digiByte"
    "reddCoin" "monaCoin" "maidSafeCoin" "monero" "byteCoin" "bitShares"
    "stellar" "syscoin" "verge" "tether" "nem" "ethereum" "siacoin" "augur"
    "decred" "pivx" "lisk" "digixDao" "steem"
)

for i in `seq 2 9`
do
    echo "Creating Crypto_0$i.js"
    touch "Crypto_0$i".js
    cat > "Crypto_0$i".js <<EOF
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Head from '../../components/Head';
import crypto_0${i}_contract from '../../components/crypto/contract/crypto_0${i}_contract';
import Header from '../../components/Header';
import CryptoContent from '../../components/crypto/CryptoContent';
import CryptoSidebar from '../../components/crypto/CryptoSidebar';
import Footer from '../../components/Footer';
import {updateCrypto} from "../../redux/actions";
import {fetchCryptoContract, getDefaultCrypto, cryptoNames} from "../../components/crypto/cryptoUtils";

class Crypto_0${i} extends Component {
    static defaultData = getDefaultCrypto({
        name: cryptoNames.${names[i]},
        index: ${i}
    });

    static defaultProps = {
        marketData: {},
        data: Crypto_0${i}.defaultData
    };

    static propTypes = {
        marketData: PropTypes.object,
        data: PropTypes.object
    };

    static fetchContract(){
        return fetchCryptoContract(crypto_0${i}_contract, Crypto_0${i}.defaultData.index);
    }

    componentDidMount(){
        Crypto_0${i}.fetchContract().then(response => {
            this.props.dispatch(updateCrypto(response));
        }).catch(err => {
            AlertOptionPane.showErrorAlert({message: err.toString()});
        });
    }

    render() {
        if (Object.keys(this.props.marketData).length > 0) {
            let {id} = this.props.marketData;
            let {name} = this.props.data;

            return (
                <div>
                    <Head fetchMarketData={false} addTimer={false}/>
                    <div id="crypto">
                        <Header/>
                        <CryptoContent data={Object.assign({}, this.props.data, this.props.marketData)}/>
                        <CryptoSidebar id={id} cryptoName={name}/>
                        <Footer/>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Head fetchMarketData={true} addTimer={false}/>
                <div id="crypto">
                    <div className="loader"/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {crypto, marketData} = state;

    return {
        data: crypto.filter(data =>
            data.name.toLowerCase() === Crypto_0${i}.defaultData.name.toLowerCase()
        )[0],
        marketData: (marketData.length > 0)
            ? marketData.filter(data =>
                data.name.toLowerCase() === Crypto_0${i}.defaultData.name.toLowerCase()
            )[0]
            : {}
    };
};

export const cryptoData0${i} = Crypto_0${i}.defaultData;

export default connect(mapStateToProps)(Crypto_0${i});
EOF
done

for i in `seq 10 25`
do
    echo "Creating Crypto_$i.js"
    touch "Crypto_$i".js
    cat > "Crypto_$i".js <<EOF
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Head from '../../components/Head';
import crypto_${i}_contract from '../../components/crypto/contract/crypto_${i}_contract';
import Header from '../../components/Header';
import CryptoContent from '../../components/crypto/CryptoContent';
import CryptoSidebar from '../../components/crypto/CryptoSidebar';
import Footer from '../../components/Footer';
import {updateCrypto} from "../../redux/actions";
import {fetchCryptoContract, getDefaultCrypto, cryptoNames} from "../../components/crypto/cryptoUtils";

class Crypto_${i} extends Component {
    static defaultData = getDefaultCrypto({
        name: cryptoNames.${names[i]},
        index: ${i}
    });

    static defaultProps = {
        marketData: {},
        data: Crypto_${i}.defaultData
    };

    static propTypes = {
        marketData: PropTypes.object,
        data: PropTypes.object
    };

    static fetchContract(){
        return fetchCryptoContract(crypto_${i}_contract, Crypto_${i}.defaultData.index);
    }

    componentDidMount(){
        Crypto_${i}.fetchContract().then(response => {
            this.props.dispatch(updateCrypto(response));
        }).catch(err => {
            AlertOptionPane.showErrorAlert({message: err.toString()});
        });
    }

    render() {
        if (Object.keys(this.props.marketData).length > 0) {
            let {id} = this.props.marketData;
            let {name} = this.props.data;

            return (
                <div>
                    <Head fetchMarketData={false} addTimer={false}/>
                    <div id="crypto">
                        <Header/>
                        <CryptoContent data={Object.assign({}, this.props.data, this.props.marketData)}/>
                        <CryptoSidebar id={id} cryptoName={name}/>
                        <Footer/>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Head fetchMarketData={true} addTimer={false}/>
                <div id="crypto">
                    <div className="loader"/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {crypto, marketData} = state;

    return {
        data: crypto.filter(data =>
            data.name.toLowerCase() === Crypto_${i}.defaultData.name.toLowerCase()
        )[0],
        marketData: (marketData.length > 0)
            ? marketData.filter(data =>
                data.name.toLowerCase() === Crypto_${i}.defaultData.name.toLowerCase()
            )[0]
            : {}
    };
};

export const cryptoData${i} = Crypto_${i}.defaultData;

export default connect(mapStateToProps)(Crypto_${i});
EOF
done
printEndOfSection


printTitle "Updating defaultCrypto"
cd ../../components/crypto
> defaultCrypto.js

for i in `seq 1 9`
do
    echo "import Crypto_0${i}, {cryptoData0${i}} from '../../pages/crypto/Crypto_0$i';" >> defaultCrypto.js
done

for i in `seq 10 25`
do
    echo "import Crypto_${i}, {cryptoData${i}} from '../../pages/crypto/Crypto_$i';" >> defaultCrypto.js
done

echo "import AlertOptionPane from '../Alert/AlertOptionPane';

export const defaultCrypto = [" >> defaultCrypto.js
for i in `seq 1 9`
do
    echo "Updating cryptoData0${i}..."
    echo "    cryptoData0${i}," >> defaultCrypto.js
done

for i in `seq 10 25`
do
    echo "Updating cryptoData${i}..."
    echo "    cryptoData${i}," >> defaultCrypto.js
done

echo "];" >> defaultCrypto.js

echo "
export const fetchAllCryptoContracts = ({onContractFetched}) => {
    return Crypto_01.fetchContract().then(response => {
        onContractFetched(response);
        return Crypto_02.fetchContract();
    })" >> defaultCrypto.js

for i in `seq 3 9`
do
    echo "    .then(response => {
        onContractFetched(response);
        return Crypto_0${i}.fetchContract();
    })" >> defaultCrypto.js
done

for i in `seq 10 25`
do
    echo "    .then(response => {
        onContractFetched(response);
        return Crypto_${i}.fetchContract();
    })" >> defaultCrypto.js
done

echo "    .then(response => {
        onContractFetched(response);
    }).catch(err => {
        AlertOptionPane.showErrorAlert({message: err.toString()});
    });
};" >> defaultCrypto.js
printEndOfSection


printTitle "Generating placeholder images"
cd ../../static/images

for i in `seq 1 25`
do
    echo "Creating crypto_icons/${names[i]}_icon.png..."
    cp picture_icon.png crypto_icons/${names[i]}_icon.png
    cp picture_medium.png crypto_icons/${names[i]}_medium.png
done
printEndOfSection