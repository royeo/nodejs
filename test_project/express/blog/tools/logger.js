const log4js = require('log4js');

const log4jsConfig = {
  replaceConsole: '',
  level: config.log.level,
  appenders: [
    {
      type: "console"
    },
    {
      type: 'dateFile',
      filename: path.join(),
      pattern: 'yyyyMMdd',
      alwaysIncludePattern: true,
      category: 'main',
      maxLogSize: 20480,
      backups: 3
    }, 
    {
      type: 'logLevelFilter',
      level: 'ERROR',
      category: 'main',
      appender: {
        type: 'file',
        filename: 'default.log',
        maxLogSize: 20480
      }
    }
  ]
};

log4js.configure(log4jsConfig);
var logger = log4js.getLogger('main');
logger.setLevel('AUTO');
logger.log4js = log4js;

module.exports = logger;