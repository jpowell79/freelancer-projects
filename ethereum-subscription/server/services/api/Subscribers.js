const {getAllModelEntries} = require('./apiUtils');

function Subscribers({req, sequelize, responseHandler}){
    this.model = sequelize.models.subscribers;

    this.sendGetAll = () => getAllModelEntries(responseHandler, this.model);
}

module.exports = Subscribers;