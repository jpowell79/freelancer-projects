export const STATIC = `static`;
export const IMAGES = `${STATIC}/images`;
export const CRYPTO_ICONS = `${IMAGES}/crypto_icons`;
export const CRYPTO = `crypto`;

class Paths {
    static getImage(name, size, root = '../..'){
        return `${root}/${IMAGES}/${name}_${size}.png`;
    };

    static getCryptoIcon(name, size, root = '../..'){
        return `${root}/${CRYPTO_ICONS}/${name}_${size}.png`;
    };

    static getCryptoPage(index, root = '../..'){
        if(index < 10){
            return `${root}/${CRYPTO}/Crypto_0${index}`;
        }

        return `${root}/${CRYPTO}/Crypto_${index}`;
    };
}

export default Paths;