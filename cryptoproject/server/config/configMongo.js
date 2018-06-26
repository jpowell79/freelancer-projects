const mongoose = require('mongoose');
const siteSettings = require('../../site-settings');

module.exports = () => {
    const MONGODB_URI = process.env.MONGODB_URI || siteSettings.MONGODB_URI;
    mongoose.Promise = Promise;
    mongoose.connect(MONGODB_URI);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    return db;
};