const standardResponseHandler = (res, promise) => {
    return (
        promise.then(() => {
            res.sendStatus(200);
        }).catch(err => {
            if(global.isDevelopment()) console.error(err);
            res.sendStatus(400);
        })
    );
};

module.exports = {
    standardResponseHandler
};