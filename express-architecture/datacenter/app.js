'use strict';

require('./global_regist');
const web = require('./servers/web');
const cron = require('./cron/cron');

web.start();
cron.init();
