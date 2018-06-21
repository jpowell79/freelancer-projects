const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const historicDataSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        startPrice: {
            type: Number,
            required: true
        },
        finishPrice: {
            type: Number,
            required: true
        },
        pot: {
            type: Number,
            required: true
        },
        nrOfTrades: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: {
            createdAt: 'timestamp'
        }
    });

module.exports = mongoose.model('HistoricData', historicDataSchema);