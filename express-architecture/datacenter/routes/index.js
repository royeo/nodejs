'use strict';

const express = require('express');

function createRouter(versionDir) {
  let router = express.Router();
  fs.readdirSync(versionDir).forEach(file => {
    require(path.join(versionDir, file))(router);
  });
  return router;
}

const router = express.Router();
const v1Admin = createRouter(path.join(__dirname, 'v1/admin'));
const v1Web = createRouter(path.join(__dirname, 'v1/web'));

router.use('/webapi/v1', v1Web);
router.use('/adminapi/v1', v1Admin);

module.exports = router;
