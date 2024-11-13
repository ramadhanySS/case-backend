const User = require('../user/model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { getToken } = require('../../utils');

const register = async (req, res, next) => {
  try {
    const payload = req.body;
    let user = new User(payload);
    await user.save();
    return res.json(user);
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    return res.json({
      error: 0,
      message: err.message,
    });
  }
};

const localStategy = async (email, password, done) => {
  try {
    let user = await User.findOne({ email }).select('-_v -createdAt -updatedAt -cart_items -token');
    if (!user) return done();
    if (bcrypt.compareSync(password, user.password)) {
      ({ password, ...UserWithoutPassword } = user.toJSON());
      return done(null, UserWithoutPassword);
    }
  } catch (err) {
    done(err, null);
  }
  done();
};

const login = async (req, res, next) => {
  passport.authenticate('local', async function (err, user) {
    if (err) return next(err);

    if (!user) return res.json({ error: 1, message: 'Email or Password incorect' });

    let signed = jwt.sign(user, config.secretkey);

    await User.findByIdAndUpdate(user._id, { $push: { token: signed } });

    res.json({
      message: 'Login Successfully',
      user,
      token: signed,
    });
  })(req, res, next);
};

const logout = async (req, res, next) => {
  try {
    let token = getToken(req);

    if (!token) {
      return res.json({
        error: 1,
        message: 'No token provided!',
      });
    }

    let user = await User.findOneAndUpdate({ token: { $in: [token] } }, { $pull: { token: token } }, { useFindAndModify: false });

    if (!user) {
      return res.json({
        error: 1,
        message: 'No User Found!',
      });
    }

    return res.json({
      error: 0,
      message: 'Logout Successful',
    });
  } catch (err) {
    if (!res.headersSent) {
      return next(err);
    }
  }
};

const me = async (req, res, next) => {
  if (!req.user) {
    return res.json({
      err: 1,
      message: `You'er not login or token expired`,
    });
  }

  return res.json(req.user);
};

module.exports = { register, localStategy, login, logout, me };
