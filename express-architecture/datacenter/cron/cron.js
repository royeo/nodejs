'use strict';

const cron = require('cron');

exports.init = function () {
  new cron.CronJob('0 10 * * * *', () => {  // 10 minutes
    console.log('I am cron task.');
  });
};
