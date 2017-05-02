'use strict';

const rp = require('request-promise');
const baseUrl = `${config.web.url}/webapi/v1`;
const webRP = rp.defaults({baseUrl, json: true});

describe('test webapi /', () => {
  it('test GET /', async () => {  
    let data = await webRP.get({uri: '/'});
    requestSuccess(data);
    data.Message.should.equal('success');
  })
})

describe('test webapi /detail', () => {
  it('test GET /detail', async () => {  
    let data = await webRP.get({uri: '/detail'});
    requestSuccess(data);
    data.Message.should.equal('success');
  })
})