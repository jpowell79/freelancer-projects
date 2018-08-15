const {getAllModelEntries} = require('./apiUtils');
const ResponseHandler = require('./ResponseHandler');

function Subscribers({req, res, sequelize}){
    this.model = sequelize.models.subscribers;
    const responseHandler = new ResponseHandler(res);

    this.sendGetAll = () => getAllModelEntries(responseHandler, this.model);
}

module.exports = Subscribers;