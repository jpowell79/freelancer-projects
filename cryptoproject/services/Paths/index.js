import Router from "next/router";
import Settings from '../../site-settings';

export const STATIC = `static`;
export const IMAGES = `${STATIC}/images`;
export const TEAM_IMAGES = `${IMAGES}/team`;
export const CRYPTO_ICONS = `${IMAGES}/crypto-icons`;

class Paths {
    static getImage(name, size, type = 'png', root = '../..'){
        return `${root}/${IMAGES}/${name}_${size}.${type}`;
    };

    static getTeamImage(name, type = 'png', root = '../..'){
        return `${root}/${TEAM_IMAGES}/${name}.${type}`;
    }

    static getCryptoIcon(symbol, size, root = '../..'){
        let parsedName = symbol.toUpperCase();

        return `${root}/${CRYPTO_ICONS}/${parsedName}_${size}.png`;
    };

    static getCryptoPage(root = '../..'){
        return `${root}/Crypto`;
    };

    static getHistoricDataPage(root = '../..'){
        return `${root}/HistoricData`;
    };

    static getDividendFundPage(root = '../..'){
        return `${root}/DividendFund`;
    };

    static getSmartContractsPage(root = '../..'){
        return `${root}/SmartContracts`;
    }

    static getTradingPage(root = '../..'){
        return `${root}/Trade`;
    }

    static getTheTeamPage(root = '../..'){
        return `${root}/TheTeam`;
    }

    static getHowItWorksPage(root = '../..'){
        return `${root}/HowItWorks`;
    }

    static getEtherScanAddressUrl(address){
        return `${Settings.ETHER_SCAN_URL}/address/${address}`;
    }

    static getEtherScanTransactionUrl(address){
        return `${Settings.ETHER_SCAN_URL}/tx/${address}`;
    }

    static redirect = (res, url) => {
        if(res){
            res.writeHead(302, {
                Location: url
            });
            res.end();
            res.finished = true;
        } else {
            Router.push(url);
        }
    };
}

export default Paths;