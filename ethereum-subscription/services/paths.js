const STATIC = `static`;
const IMAGES = `${STATIC}/images`;
const isServer = require('./utils').isServer;
const session = require('./session');

module.exports = {
    pages: {
        index: '/',
        login: '/Login',
        register: '/Register',
        howItWorks: '/HowItWorks',
        about: '/About',
        admin: '/Admin',
        supplier: '/Supplier'
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
    redirectIfNotLoggedInSupplier: async (url, req = null, res = null) => {
        return (
            session.isLoggedIn(req)
                .then(loggedIn => {
                    if(!loggedIn){
                        module.exports.redirect(url, res);
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        );
    },
    redirectIfNotLoggedInAdmin: async (url, req = null, res = null) => {
        return (
            session.isLoggedInAdmin(req)
                .then(loggedInAdmin => {
                    if(!loggedInAdmin){
                        module.exports.redirect(url, res);
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        );
    },
};