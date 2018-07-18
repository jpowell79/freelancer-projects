import Router from "next/router";
import Settings from '../../site-settings';

export const STATIC = `static`;
export const IMAGES = `${STATIC}/images`;
export const TEAM_IMAGES = `${IMAGES}/team`;
export const FILES = `${STATIC}/files`;
export const ICONS = `${IMAGES}/icons`;
export const FAVICON = `${IMAGES}/favicon`;
export const CRYPTO_ICONS = `${IMAGES}/crypto-icons`;
export const ROOT = '';

class Paths {
    static getImage({name, size = '', type = 'png', root = ROOT}){
        const parsedSize = (size === '') ? '' : `_${size}`;

        return `${root}/${IMAGES}/${name}${parsedSize}.${type}`;
    };

    static getFile({name, type, root = ROOT}){
        return `${root}/${FILES}/${name}.${type}`;
    }

    static getTeamImage({name, type = 'png', root = ROOT}){
        return `${root}/${TEAM_IMAGES}/${name}.${type}`;
    }

    static getCryptoIcon({symbol, size, type = 'png', root = ROOT}){
        let parsedName = symbol.toUpperCase();

        return `${root}/${CRYPTO_ICONS}/${parsedName}_${size}.${type}`;
    };

    static getIcon({name, type = 'png', root = ROOT}){
        return `${root}/${ICONS}/${name}.${type}`;
    };

    static getFaviconFile({name, type = 'png', root = ROOT}){
        return `${root}/${FAVICON}/${name}.${type}`;
    }

    static getCryptoPage(root = ROOT){
        return `${root}/Crypto`;
    };

    static getHistoricDataPage(root = ROOT){
        return `${root}/HistoricData`;
    };

    static getTokenHolderClaimPage(root = ROOT){
        return `${root}/TokenHolderClaim`;
    };

    static getSmartContractsPage(root = ROOT){
        return `${root}/SmartContracts`;
    }

    static getTradingPage(root = ROOT){
        return `${root}/Trade`;
    }

    static getTheTeamPage(root = ROOT){
        return `${root}/TheTeam`;
    }

    static getHowItWorksPage(root = ROOT){
        return `${root}/HowItWorks`;
    }

    static getContactPage(root = ROOT){
        return `${root}/Contact`;
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