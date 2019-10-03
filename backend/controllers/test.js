const User = require('../models/User');
const Profile = require('../models/Profile');

exports.sendTest = async (req, res, next) => {
  const {A, B, C, D } = req.body 
  const { profile } = await User.findById(req.user.id)
  await Profile.findByIdAndUpdate(profile,
     { test_hermann:[{A},{B},{C},{D}] },
     { new:true }
  )
  res.status(200).json({ profile });
}