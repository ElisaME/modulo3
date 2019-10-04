const User = require('../models/User');
const Profile = require('../models/Profile');

exports.sendTest = async (req, res, next) => {
  const {A, B, C, D } = req.body 
  const { profile } = await User.findById(req.user.id)
  let results = [{A}, {B}, {C},{D}] 
  // results.sort((a, b) => (a >= b) ? -1 : 1);
  // console.log(results)
  await Profile.findByIdAndUpdate(profile,
     { test_hermann:results},
     { new:true }
  )
  res.status(200).json({ profile });
}