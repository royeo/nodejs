'use strict';

// supertest是一个适用于node模拟http请求的库
const request = require('supertest');
const express = require('express');

let app = express();

app.get('/user', function (req, res) {
  res.send(200, {name: 'tobi'});
});

request(app)
  .get('user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '20')
  .expect(200)
  .end((err, res) => {
    if (err) {
      throw err;
    }
  });
