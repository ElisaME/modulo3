const Event = require('../models/Events');
const User = require('../models/User');

exports.eventsMentor = async (req, res, next) => {
  const user = await User.findById(req.params.id)
  const events = await Event.find({host_id:user})
  res.status(200).json({events})
}

exports.newEvent = async (req, res, next) => {
  const host_id = req.user.id
  const {place, duration, students, description, total_students,date, hour} = req.body
  const event = await Event.create({host_id, place, duration, students, description, total_students, date, hour})
  res.status(200).json({event})
}

exports.editEvent = async ( req, res, next ) => {
  const {place, duration, students, description, total_students,date, hour} = req.body
  const event = await Event.findByIdAndUpdate(req.params.id, {place, duration, students, description, total_students, date, hour}, {new:true})
  res.status(200).json({event})
}

exports.deleteEvent = (req, res, next) => {
  Event.findByIdAndDelete(req.params.id)
    .then((event) => res.status(200).json({ event }))
    .catch((error) => res.status(500).json({ error }));
};

exports.joinEvent = async (req, res, next) => {
  const user = await User.findById(req.user.id)
  const event = await Event.findById(req.params.id)
  event.students.push(user.id)
  event.save()
  .then((event) => 
    res.status(200).json({event}
  ))
  .catch((error) => res.status(500).json({error})); 
}

exports.leftEvent = async (req, res, next) => {
  const user = await User.findById(req.user.id)
  const event = await Event.findById(req.params.id)
  const index = event.students.indexOf(user.id);
  event.students.splice(index,1)
  event.save()
  .then((event) => 
    res.status(200).json({event}
  ))
  .catch((error) => res.status(500).json({error}));  
}
