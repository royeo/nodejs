'use strict';

const path = require('path');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
global.chai = chai;
chai.should();

require('../global_regist');
const web = require('../servers/web');


global.requestSuccess = (res) => {
  res.RetSucceed.should.equal(true);
  res.Succeed.should.equal(true);
  res.Code.should.equal(200);
}

describe('start servers', function() {
  this.timeout(60000);
  before(function() {
    return Promise.resolve([web]).each(function(app) {
      return app.start();
    });
  });
  it('start servers', () => {
  });
});

describe('start test web', () => {
  require(path.join(__dirname, 'web'));
});

describe('start test admin', () => {
  require(path.join(__dirname, 'admin'));
});
