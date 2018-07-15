const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cryptoDataSchema = new Schema(
    {
        id: {
            type: Number,
            required: true
        },
        cryptoData: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: '',
            updatedAt: 'timestamp'
        },
        versionKey: false
    }
);

module.exports = mongoose.model('CryptoData', cryptoDataSchema);