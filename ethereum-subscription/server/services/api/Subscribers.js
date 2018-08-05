const {getAllModelEntries} = require('./apiUtils');

function Subscribers({req, res, sequelize}){
    this.model = sequelize.models.subscribers;

    this.sendGetAll = () => getAllModelEntries(res, this.model);
}

module.exports = Subscribers;