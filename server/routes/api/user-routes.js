const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveFav,
  deleteFav,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/')

router.route('/homepage').put(authMiddleware, saveFav);

router.route('/login').post(login);

router.route('/signup').post(createUser);

//profile page//
// router.route('/me').get(authMiddleware, getSingleUser);

router.route('/favorites/:_id').delete(authMiddleware, deleteFav);

module.exports = router;
