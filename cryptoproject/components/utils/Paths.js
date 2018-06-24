import Router from "next/router";

export const STATIC = `static`;
export const IMAGES = `${STATIC}/images`;
export const CRYPTO_ICONS = `${IMAGES}/crypto_icons`;

class Paths {
    static getImage(name, size, root = '../..'){
        return `${root}/${IMAGES}/${name}_${size}.png`;
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