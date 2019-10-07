const User = require('../models/User');
const Career = require('../models/Career');

exports.getProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id)
  const careers = await Career.find()
  res.status(200).json({user, careers})
};

exports.editProfile = async (req, res, next) => {
  const user  = req.user;
  await User.findByIdAndUpdate(user, {...req.body}, {new:true})
  res.status(200).json({user})
};