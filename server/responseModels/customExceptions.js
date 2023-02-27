// Load exceptions
var Exception = require("./Exception");
var constants = require("../constants/responseConstants");
//========================== Load Modules End =============================


//========================== Export Module Start ===========================
module.exports = {
    completeCustomException: (errcode, errMsg, error) => {
        if (error == false)
            return new Exception(errcode, errMsg);
        else
            return new Exception(errcode, errMsg, error);
    },
    intrnlSrvrErr: (err) => {
        return new Exception(1, constants.MESSAGES.INTERNAL_SERVER_ERROR, err);
    },
    unauthorizeAccess: (err) => {
        return new Exception(2, constants.MESSAGES.UNAUTHORIZED_ACCESS_EXCEPTION, err)
    },
    noTokenSupplied: (err) => {
        return new Exception(3, constants.MESSAGES.NO_TOKEN_SUPPLIED, err)
    },
};