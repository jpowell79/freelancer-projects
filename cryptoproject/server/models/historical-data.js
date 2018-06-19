const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const historicalDataSchema = new Schema({
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
        potSize: {
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
            createdAt: 'createdAt'
        }
    });

module.exports = mongoose.model('HistoricalData', historicalDataSchema);