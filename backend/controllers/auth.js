const User = require('../models/User');
const Profile = require('../models/Profile');


exports.signup = async (req, res, next) => {
  const {email, category} = req.body
  const profile =  await Profile.create({})
  User.register({email, category, profile }, req.body.password)
    .then((user) => res.status(201).json({ user }))
    .catch((err) => res.status(500).json({ err }));
};

exports.login = (req, res, next) => {
  const { user } = req;
  res.status(200).json({ user });
};

exports.logout = (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: 'Logged out' });
};
