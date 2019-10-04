const User = require('../models/User');
const Profile = require('../models/Profile');

exports.getProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('profile')
  res.status(200).json({user})
};

exports.editProfile = async (req, res, next) => {
  const {name, image } = req.body
  const { profile } = await User.findById(req.user.id)
  await Profile.findByIdAndUpdate(profile, {name,image})
  res.status(200).json({ profile });
};