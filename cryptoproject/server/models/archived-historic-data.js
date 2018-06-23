const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;
const archiveHistoricDataSchema = new Schema({
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
    date: {
        type: Number,
        required: true
    }
},
{
    versionKey: false
});

archiveHistoricDataSchema.plugin(autoIncrement.plugin, 'ArchivedHistoricalData');
module.exports = mongoose.model('ArchivedHistoricData', archiveHistoricDataSchema);