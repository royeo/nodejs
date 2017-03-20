/**************** ES5 ***************/

// module.js
module.exports = {
    port:3000,
    getAccounts: function() {

    }
};

// main.js
var service = require('module.js');
console.log(service.port);


/**************** ES6 ***************/

// module.js
export let port = 3000;
export function getAccounts() {

}

// main.js
import { port, getAccounts } from 'module';
console.log(port);
//或者
import * as service from 'module';
console.log(service.port);

