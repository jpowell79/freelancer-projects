const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

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

historicDataSchema.plugin(autoIncrement.plugin, 'HistoricalData');
module.exports = mongoose.model('HistoricData', historicDataSchema);