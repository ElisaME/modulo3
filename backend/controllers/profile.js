const User = require('../models/User');
const Profile = require('../models/Profile');

exports.getProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id)
  res.status(200).json({user})
};

exports.editProfile = async (req, res, next) => {
  const user  = req.user;
  await User.findByIdAndUpdate(user, {...req.body}, {new:true})
  res.status(200).json({user})
};