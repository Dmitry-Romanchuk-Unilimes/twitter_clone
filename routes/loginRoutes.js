const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../schemas/UserSchema');
const bcrypt = require('bcrypt');

app.set('view engine', 'pug');
app.set('views', 'views');

router.get('/', (req, res, next) => {
  res.status(200).render('login');
});

app.use(bodyParser.urlencoded({
  extended: false
}));

router.post('/', async (req, res, next) => {
  const payload = req.body;

  if (req.body.logUsername && req.body.logPassword) {
    const user = await User.findOne({
      $or: [{
          userName: req.body.logUsername
        },
        {
          email: req.body.logUsername
        }
      ]
    }).catch((error) => {
      console.log(error);
      payload.errorMessage = 'Something went wrong';
      res.status(200).render('login', payload);
    });

    if (user) {
      const result = await bcrypt.compare(req.body.logPassword, user.password);

      if (result) {
        req.session.user = user;
        return res.redirect('/');
      }
    }
    payload.errorMessage = 'Login credentials incorrect';
    res.status(200).render('login', payload);
  }

  payload.errorMessage = 'Make sure each field has a valid value';
  return res.status(200).render('login', payload);
})

module.exports = router;