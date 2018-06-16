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

const address = '0x7006b93fb332d6f5e2ea8bb0e2b9f245f8a4d827';

const abi =
    [
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "admin",
            "outputs": [
                {
                    "name": "admin",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "cryptoname",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "extendedtimecloses",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "numberoftrades",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "potsize",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "standardtimecloses",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "startprice",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "startrank",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "thisContractAddress",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

export default new web3.eth.Contract(abi, address);
EOF
}

printTitle "Generating Crypto Contracts"
cd components/crypto/contract
for i in `seq 1 9`
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
import crypto_0${i}_contract from '../../components/crypto/contract/crypto_01_contract';
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
        /*
        Crypto_0${i}.fetchContract().then(response => {
            this.props.dispatch(updateCrypto(response));
        }).catch(err => {
            AlertOptionPane.showErrorAlert({message: err});
        });
        */
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
import crypto_${i}_contract from '../../components/crypto/contract/crypto_01_contract';
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
        /*
        Crypto_${i}.fetchContract().then(response => {
            this.props.dispatch(updateCrypto(response));
        }).catch(err => {
            AlertOptionPane.showErrorAlert({message: err});
        });
        */
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
    Crypto_01.fetchContract().then(response => {
        onContractFetched(response);
    }).catch(err => {
        AlertOptionPane.showErrorAlert({message: err});
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