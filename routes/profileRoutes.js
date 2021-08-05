const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../schemas/UserSchema');

router.get('/', async (req, res, next) => {
  // const payload = {
  //   pageTitle: req.session.user.userName,
  //   userLoggedIn: req.session.user,
  //   userLoggedInJs: JSON.stringify(req.session.user),
  //   profileUser: req.session.user
  // }
  const payload = await getPayload(req.session.user.userName, req.session.user);
  res.status(200).render('profilePage', payload);
});

router.get('/:username', async (req, res, next) => {
  const payload = await getPayload(req.params.username, req.session.user);

  res.status(200).render('profilePage', payload);
})

router.get('/:username/replies', async (req, res, next) => {
  const payload = await getPayload(req.params.username, req.session.user);
  payload.selectedTab = 'replies';
  res.status(200).render('profilePage', payload);
})

router.get('/:username/following', async (req, res, next) => {
  const payload = await getPayload(req.params.username, req.session.user);
  payload.selectedTab = 'following';
  res.status(200).render('followersAndFollowing', payload);
})

router.get('/:username/followers', async (req, res, next) => {
  const payload = await getPayload(req.params.username, req.session.user);
  payload.selectedTab = 'followers';
  res.status(200).render('followersAndFollowing', payload);
})

async function getPayload(userName, userLoggedIn) {
  let user = await User.findOne({
    userName
  });

  if (!user) {
    user = await User.findById(userName);

    if(!user) return {
      pageTitle: 'User not found',
      userLoggedIn: userLoggedIn,
      userLoggedInJs: JSON.stringify(userLoggedIn)
    }
  }

  return {
    pageTitle: user.userName,
    userLoggedIn: userLoggedIn,
    userLoggedInJs: JSON.stringify(userLoggedIn),
    profileUser: user
  }
}

module.exports = router;