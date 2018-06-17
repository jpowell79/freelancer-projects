export const STATIC = `static`;
export const IMAGES = `${STATIC}/images`;
export const CRYPTO_ICONS = `${IMAGES}/crypto_icons`;

class Paths {
    static getImage(name, size, root = '../..'){
        return `${root}/${IMAGES}/${name}_${size}.png`;
    };

    static getCryptoIcon(name, size, root = '../..'){
        return `${root}/${CRYPTO_ICONS}/${name}_${size}.png`;
    };

    static getCryptoPage(root = '../..'){
        return `${root}/Crypto`;
    };
}

export default Paths;