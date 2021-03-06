const {getAllModelEntries} = require("./apiUtils");

function Subscribers({req, sequelize, responseHandler}){
    this.model = sequelize.models.subscribers;

    this.sendGetAll = async () => getAllModelEntries(responseHandler, this.model);

    this.createIfNotExists = async () => {
        const {
            subscriberAddress,
            subscriberEmail
        } = req.body;

        return this.getOne({subscriberAddress})
            .then(subscriberData => {
                if(!subscriberData){
                    return this.model.create({
                        walletAddress: subscriberAddress,
                        email: subscriberEmail
                    });
                }
            });
    };

    this.getOne = async ({subscriberAddress}) => {
        return this.model.findOne({
            where: {
                walletAddress: subscriberAddress
            }
        });
    }
}

module.exports = Subscribers;