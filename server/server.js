const app = require('express')();
var cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const logger = require('./logger').logger;
const responseHandler = require('./utils/responseHandler');
const config = require('./config')
const port = parseInt(process.env.PORT || 3001);
const sqlRoutes = require('./routes/sqlRoutes');
const queryRoutes = require('./routes/queryRoutes');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();
app.use(cors());

app.use(responseHandler.handleError);
app.use('/api/v1/sql', sqlRoutes);
app.use('/api/v1.0/query', queryRoutes);

app.listen(port, () => {
  // config.dbConnection.connectDb();
  console.log(`Server is running on port ${port}`);
  logger.info(`Server listening on ${port}, in ${config.cfg.ENVIRONMENT} mode`)
})

module.exports = app