const getAllModelEntries = (responseHandler, model) => {
    return model
        .findAll({})
        .then(entries => entries.map(entry => entry.dataValues))
        .then(entries => {
            responseHandler.sendSuccess(entries);
        })
        .catch(err => {
            responseHandler.sendSomethingWentWrong(err);
        });
};

module.exports = {
    getAllModelEntries,
};