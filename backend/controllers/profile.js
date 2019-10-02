const User = require('../models/User');
const Profile = require('../models/Profile');

exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
};

exports.editProfile = async (req, res, next) => {
  const {name, image } = req.body
  const { profile } = await User.findById(req.user.id)
  await Profile.findByIdAndUpdate(profile, {name,image})
  res.status(200).json({ profile });
};