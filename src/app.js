const express = require('express');
const router = require('./controllers/RouterController').default;
const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const responseTime = require('response-time');
const app = express();
const path = require('path');

app.use(compression());
app.use(responseTime());
app.use(morgan('combined'));
app.use(helmet());

app.use(cors({
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: '*'
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));

router(app);

export default app;