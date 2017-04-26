'use strict';

module.exports = {
  verifyAccount,
  regAccount
};

async function regAccount(opt) {
  return await db.User.create(opt);
}

async function verifyAccount(opt) {
  return await db.User.findOne({where: {name: opt.name, password: opt.password}});
}
