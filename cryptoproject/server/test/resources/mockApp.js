const configMongo = require('../../config/configMongo');
const configServer = require('../../config/configServer');

let mockApp = {
    render: () => {},
    getRequestHandler: () => {
        return () => {};
    }
};

let db = configMongo();
let server = configServer(db, mockApp);

module.exports = server.listen(3300);