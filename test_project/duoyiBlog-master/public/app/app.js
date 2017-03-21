'use strict';

var Vue       = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);
var app       = Vue.extend(require('./app.vue'));
var router    = new VueRouter();

require('./route-config.js')(router);
router.start(app, '#app');