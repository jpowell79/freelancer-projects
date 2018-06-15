import Crypto_01, {cryptoData01} from '../../pages/crypto/Crypto_01';
import Crypto_02, {cryptoData02} from '../../pages/crypto/Crypto_02';
import Crypto_03, {cryptoData03} from '../../pages/crypto/Crypto_03';
import Crypto_04, {cryptoData04} from '../../pages/crypto/Crypto_04';
import Crypto_05, {cryptoData05} from '../../pages/crypto/Crypto_05';
import Crypto_06, {cryptoData06} from '../../pages/crypto/Crypto_06';
import Crypto_07, {cryptoData07} from '../../pages/crypto/Crypto_07';
import Crypto_08, {cryptoData08} from '../../pages/crypto/Crypto_08';
import Crypto_09, {cryptoData09} from '../../pages/crypto/Crypto_09';
import Crypto_10, {cryptoData10} from '../../pages/crypto/Crypto_10';
import Crypto_11, {cryptoData11} from '../../pages/crypto/Crypto_11';
import Crypto_12, {cryptoData12} from '../../pages/crypto/Crypto_12';
import Crypto_13, {cryptoData13} from '../../pages/crypto/Crypto_13';
import Crypto_14, {cryptoData14} from '../../pages/crypto/Crypto_14';
import Crypto_15, {cryptoData15} from '../../pages/crypto/Crypto_15';
import Crypto_16, {cryptoData16} from '../../pages/crypto/Crypto_16';
import Crypto_17, {cryptoData17} from '../../pages/crypto/Crypto_17';
import Crypto_18, {cryptoData18} from '../../pages/crypto/Crypto_18';
import Crypto_19, {cryptoData19} from '../../pages/crypto/Crypto_19';
import Crypto_20, {cryptoData20} from '../../pages/crypto/Crypto_20';
import Crypto_21, {cryptoData21} from '../../pages/crypto/Crypto_21';
import Crypto_22, {cryptoData22} from '../../pages/crypto/Crypto_22';
import Crypto_23, {cryptoData23} from '../../pages/crypto/Crypto_23';
import Crypto_24, {cryptoData24} from '../../pages/crypto/Crypto_24';
import Crypto_25, {cryptoData25} from '../../pages/crypto/Crypto_25';
import AlertOptionPane from '../Alert/AlertOptionPane';

export const defaultCrypto = [
    cryptoData01,
    cryptoData02,
    cryptoData03,
    cryptoData04,
    cryptoData05,
    cryptoData06,
    cryptoData07,
    cryptoData08,
    cryptoData09,
    cryptoData10,
    cryptoData11,
    cryptoData12,
    cryptoData13,
    cryptoData14,
    cryptoData15,
    cryptoData16,
    cryptoData17,
    cryptoData18,
    cryptoData19,
    cryptoData20,
    cryptoData21,
    cryptoData22,
    cryptoData23,
    cryptoData24,
    cryptoData25,
];

export const fetchAllCryptoContracts = ({onContractFetched}) => {
    Crypto_01.fetchContract().then(response => {
        onContractFetched(response);
    }).catch(err => {
        AlertOptionPane.showErrorAlert({message: err});
    });
};
