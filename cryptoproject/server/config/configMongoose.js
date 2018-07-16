const mongoose = require('mongoose');

module.exports = () => {
    mongoose.Promise = Promise;
    return mongoose;
};