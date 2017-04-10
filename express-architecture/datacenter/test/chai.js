'use strict';

// BDD: should
// let should = require('chai').should();
// let foo = 'bar';
// let beverages = {tea: ['chai', 'matcha', 'oolong']};

// foo.should.be.a('string');
// foo.should.equal('bar');
// foo.should.have.length(3);
// beverages.should.have.property('tea').with.length(3);

// BDD: expect 推荐使用
let expect = require('chai').expect;
let foo = 'bar';
let beverages = {tea: ['chai', 'matcha', 'oolong']};

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.length(3);
expect(beverages).to.have.property('tea').with.length(3);
