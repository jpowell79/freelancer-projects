const STATIC = `static`;
const IMAGES = `${STATIC}/images`;

module.exports = {
    pages: {
        index: '/',
        login: '/Login',
        register: '/Register',
        howItWorks: '/HowItWorks',
        about: '/About'
    },
    static: {
        images: IMAGES
    },
    redirect: (url, res = null) => {
        if(res){
            res.writeHead(302, {Location: url});
            res.end();
            res.finished = true;
        } else {
            document.location.pathname = url;
        }
    }
};