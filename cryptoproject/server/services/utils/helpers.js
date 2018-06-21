'use strict';

const _ = require('lodash');

module.exports.formatResponse = (req, res) => {
    if (req.crudify.err) {
        console.error('formatResponse:', _.get(req, 'crudify.err.message'));
    }

    return res.json(
        req.crudify.err ||
        (req.method === 'DELETE' ? req.params : req.crudify.result)
    );
};