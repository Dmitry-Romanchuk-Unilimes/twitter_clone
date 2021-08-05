const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../schemas/UserSchema');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
  if(req.session) {
    req.session.destroy(() => {
      res.redirect('/login');
    })
  }
});

module.exports = router;