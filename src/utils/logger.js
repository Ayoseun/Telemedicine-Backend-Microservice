const winston = require('winston');

const logger = winston.createLogger({
    level: 'info', // Set the log level
    format: winston.format.simple(), // Use a simple log format
    transports: [
        new winston.transports.Console(), // Log to the console
        new winston.transports.File({ filename: 'app.log' }), // Log to a file
    ],
});

module.exports = logger;
