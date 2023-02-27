const router = require('express').Router()
const responseHandler = require('../utils/responseHandler');
const sqlFunctions = require('../functions/sqlFunctions');


router.post('/generateSql', [], async(req,res) => {
    return sqlFunctions.generateSql({...req.body})
           .then(result => { return responseHandler.sendSuccess(res, result, req) })
           .catch(error => { return responseHandler.sendError(res, error, req) })
});

module.exports = router
