const roles = require('../../services/roles');

module.exports.isLoggedIn = (req) => {
    return global.user && req.session.cookie;
};

module.exports.isLoggedInAdmin = (req) => {
    return module.exports.isLoggedIn(req)
        ? global.user.role === roles.admin : false;
};