import Router from "next/router";

export const STATIC = `static`;
export const IMAGES = `${STATIC}/images`;
export const CRYPTO_ICONS = `${IMAGES}/crypto_icons`;

class Paths {
    static getImage(name, size, type = 'png', root = '../..'){
        return `${root}/${IMAGES}/${name}_${size}.${type}`;
    };

    static getCryptoIcon(name, size, root = '../..'){
        let parsedName = name.toLowerCase().replace(/ /g,'');

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

    static getEtherScanUrl(address){
        return `https://etherscan.io/address/${address}`;
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