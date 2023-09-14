const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const COMMON_CONFIG = require('./config/common');
const usersRouter = require('./routes/usersRoutes');
const usersHistoryRouter = require('./routes/usersHistoryRoutes');
const requestRouter = require('./routes/requestRoutes');
const usersDetailsRouter = require('./routes/usersDetailsRoutes');
const productsRouter = require('./routes/productsRoutes');
const adminRouter =require('./routes/adminRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const pharmaciesRouter = require('./routes/pharmaciesRoutes');
const deliveryRoutes=require('./routes/deliveryRoutes')
const productsSwaggerOptions = require('../docs/productsSwaggerOptions');
const usersDetailsSwaggerOptions = require('../docs/usersDetailsSwaggerOptions');
const pharmaciesSwaggerOptions = require('../docs/pharmaciesSwaggerOptions');
const coverageRouter= require('./routes/coverageRoutes')
dotenv.config();

const app = express();
const httpPort = COMMON_CONFIG.NETWORK_CONFIG.PORT;


app.use(cors({ origin: true }));
app.use(express.json());

app.use(usersRouter);
app.use(usersHistoryRouter);
app.use(usersDetailsRouter);
app.use(productsRouter);
app.use(deliveryRoutes);
app.use(adminRouter);
app.use(paymentRouter);
app.use(requestRouter);
app.use(pharmaciesRouter);
app.use(coverageRouter);

// ... (other imports and setup)

// Configure Swagger
const options = {};

const productsSwaggerDocs = swaggerJsdoc(productsSwaggerOptions);
const usersDetailsSwaggerDocs = swaggerJsdoc(usersDetailsSwaggerOptions);
const pharmaciesSwaggerDocs = swaggerJsdoc(pharmaciesSwaggerOptions);



// Listen on the HTTP port
app.listen(httpPort, () => {
    console.log(`Server listening on port ${httpPort}`);
});


// Serve Swagger UI
app.use('/products-api-docs', swaggerUi.serveFiles(productsSwaggerDocs, options), swaggerUi.setup(productsSwaggerDocs));
app.use('/users-details-api-docs', swaggerUi.serveFiles(usersDetailsSwaggerDocs, options), swaggerUi.setup(usersDetailsSwaggerDocs));
app.use('/pharmacies-api-docs', swaggerUi.serveFiles(pharmaciesSwaggerDocs, options), swaggerUi.setup(pharmaciesSwaggerDocs));
