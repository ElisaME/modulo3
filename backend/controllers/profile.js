const User = require('../models/User');
const Career = require('../models/Career');
const Event = require('../models/Events');

exports.getProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('careers')
  const careers = await Career.find()
  let events;
  if(user.category == 'Student'){
    events = await Event.find({students:user.id},{"_id":1, "date":1,"hour":1,"place":1})
  }else{
    events = await Event.find({host_id:user.id})
  }
  res.status(200).json({user, careers, events})
};

exports.editProfile = async (req, res, next) => {
  const user  = req.user;
  await User.findByIdAndUpdate(user, {...req.body}, {new:true})
  res.status(200).json({user})
};

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('careers')
  const events = await Event.find({host_id:user.id})
  res.status(200).json({user, events})
}