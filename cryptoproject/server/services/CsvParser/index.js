const moment = require('moment');

function parse(historicalDataArray){
    let headings = 'Crypto Name, Start Price, Finish Price, Pot, Number of trades, Date created\n';

    let fields = [
        'name',
        'startPrice',
        'finishPrice',
        'pot',
        'nrOfTrades',
        'date'
    ];

    return headings + historicalDataArray.map(historicalData => {
        return Object.keys(historicalData).filter(dataKey =>
            fields.includes(dataKey)
        ).map(contractKey => {
            let value = historicalData[contractKey].toString();

            switch(contractKey){
            case 'startPrice':
            case 'finishPrice':
                let opts = {style: "decimal", currency: "USD"};
                return '$' + value.toLocaleString("en-US", opts);
            default:
                return value;
            }
        }).join([',']);
    }).join(['\n']);
}

module.exports = {
    parse
};