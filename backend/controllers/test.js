const User = require('../models/User');

exports.sendTest = async (req, res, next) => {
  const user = req.user.id
  const {A, B, C, D } = req.body
  let results = [A,B,C,D] 
  await User.findByIdAndUpdate(user,
    { test_hermann:results},
    { new:true }
  )
  // results.sort((a, b) => (a >= b) ? -1 : 1);
  // console.log(results)
  res.status(200).json({ user });
}