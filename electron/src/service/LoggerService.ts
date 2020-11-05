import log from 'electron-log';

// override all console ! :D
console.log = log.log;
console.info = log.info;
console.error = log.error;
console.debug = log.debug;
console.warn = log.warn;

export default log;
