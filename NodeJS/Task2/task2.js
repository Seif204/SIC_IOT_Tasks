var fileSystem = require('fs');
var filePath = require('path');
var logSystem = require('winston');
require('winston-daily-rotate-file');
var logRotation = new logSystem.transports.DailyRotateFile({
    filename: 'logs/logfile-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});
var logHandler = logSystem.createLogger({
    level: 'info',
    format: logSystem.format.combine(
        logSystem.format.timestamp(),
        logSystem.format.printf(function(info) {
            return info.timestamp + ' [' + info.level + ']: ' + info.message;
        })
    ),
    transports: [logRotation],
});

async function handleFileOperation(originalFilePath, newFilePath) {
    try {
        var fileData = await fileSystem.promises.readFile(originalFilePath, 'utf8');
        logHandler.info(`Successfully read file: ${originalFilePath}`);
        var currentTimestamp = new Date().toISOString();
        var updatedData = `${fileData}\n\nModified on: ${currentTimestamp}`;
        await fileSystem.promises.writeFile(newFilePath, updatedData, 'utf8');
        logHandler.info(`Successfully wrote to file: ${newFilePath}`);
    } catch (err) {
        logHandler.error(`Error during file operations: ${err.message}`);
    }
}
var originalFilePath = filePath.join(__dirname, 'input.txt');
var newFilePath = filePath.join(__dirname, 'output.txt');
handleFileOperation(originalFilePath, newFilePath);
