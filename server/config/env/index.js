const dotenv = require('dotenv');
dotenv.config();

var environment = process.env.NODE_ENV || 'local';
var envConfig = {}
// ENV Config

switch (environment) {
    case 'local':
    case 'localhost':
        envConfig = require('./local');
        break;
}


// ========================== Export Module Start ==========================
module.exports = {
    envConfig
}
// ========================== Export Module End ============================
