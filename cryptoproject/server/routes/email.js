const urls = require('../services/utils/urls');

module.exports = (server) => {
    server.use(urls.email, (req, res) => {
        console.log(req.body);

        req.Validator
            .validate('name', {
                length: {
                    min: 1,
                    max: 400
                }
            })
            .validate('email', {
                length: {
                    min: 5,
                    max: 400
                },
                email: true
            })
            .validate('website', {
                length: {
                    min: 4,
                    max: 400
                }
            })
            .validate('message', {
                length: {
                    min: 0,
                    max: 100000
                }
            })
            .getErrors(errors => {
                if(errors.length > 0){
                    res.send({errors});
                } else {
                    res.send({
                        name: req.Validator.getValue('name'),
                        email: req.Validator.getValue('email'),
                        website: req.Validator.getValue('website'),
                        message: req.Validator.getValue('message')
                    });
                }
            });
    });
};