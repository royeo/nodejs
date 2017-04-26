'use strict';

let mods = {};

fs.readdirSync(__dirname).filter((file) => {
  return file !== 'index.js';
}).forEach((file) => {
  Object.assign(mods, require(path.join(__dirname, file)));
});

module.exports = mods;
