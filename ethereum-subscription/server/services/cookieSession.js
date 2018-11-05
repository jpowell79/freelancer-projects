module.exports.saveUser = (req, user) => {
    req.session.user = {
        username: user.username,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
        rating: user.rating
    };
};

module.exports.saveTempUser = (req, user, uuid) => {
    req.session.tempUser = {
        username: user.username,
        password: user.password,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
        uuid: uuid
    };
};