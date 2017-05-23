'use strict';

module.exports = {
  verifyAccount,
  regAccount,
  getProduct
};

async function regAccount(opt) {
  return await db.User.create(opt);
}

async function verifyAccount(opt) {
  return await db.User.findOne({where: {name: opt.name, password: opt.password}});
}

async function getProduct(opt) {
  return await db.Product.findAll({where: {}});
}