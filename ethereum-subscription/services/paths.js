const STATIC = `static`;
const IMAGES = `${STATIC}/images`;
const isServer = require('./utils').isServer;
const isLoggedIn = require('./session').isLoggedIn;

module.exports = {
    pages: {
        index: '/',
        login: '/Login',
        register: '/Register',
        howItWorks: '/HowItWorks',
        about: '/About',
        admin: '/Admin'
    },
    static: {
        images: IMAGES
    },
    redirect: (url, res = null) => {
        if(isServer()){
            res.writeHead(302, {Location: url});
            res.end();
            res.finished = true;
        } else {
            document.location.pathname = url;
        }
    },
    redirectIfNotLoggedIn: async (url, req = null, res = null) => {
        return (
            isLoggedIn(req)
                .then(loggedIn => {
                    if(!loggedIn){
                        module.exports.redirect(url, res);
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        );
    }
};