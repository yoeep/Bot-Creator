const logLevelDefault = require('./factory').logLevel;
function logFunc(message){
    console.info(message);
}
function preLog(message){
    try{
        return JSON.stringify(message);
    }catch(error){
        //console.info(message);
        return message;
    }
    
}
module.exports = {
    logLevel: logLevelDefault,
    debug: message =>{
        message = preLog(message);
        if(module.exports.logLevel >= 3){
            const timestamp = new Date().toLocaleString();
            const stack = new Error().stack.split('\n')[2].trim().substring(3);
            const logInfo = `[DEBUG] ${timestamp} - ${stack}: ${message}`;
        
            logFunc(logInfo);
        }
        
    },
    info: message =>{
        message = preLog(message);
        if(module.exports.logLevel >= 2){
            const timestamp = new Date().toLocaleString();
            const stack = new Error().stack.split('\n')[2].trim().substring(3);
            const logInfo = `[INFO] ${timestamp} - ${stack}: ${message}`;
        
            logFunc(logInfo);
        }
    },
    error:message =>{
        message = preLog(message);
        if(module.exports.logLevel >= 1){
            const timestamp = new Date().toLocaleString();
            const stack = new Error().stack.split('\n')[2].trim().substring(3);
            const logInfo = `[ERROR] ${timestamp} - ${stack}: ${message}`;
        
            logFunc(logInfo);
        }
        
    }
}