const router = require('express').Router()
const responseHandler = require('../utils/responseHandler');
const queryFunctions = require('../functions/queryFunctions');


router.post('/', [], async(req,res) => {
    return queryFunctions.getQueryData({...req.body})
           .then(result => { return responseHandler.sendSuccess(res, result, req) })
           .catch(error => { return responseHandler.sendError(res, error, req) })
});

module.exports = router