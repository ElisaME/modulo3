const User = require('../models/User');
const Career = require('../models/Career');
const Event = require('../models/Events');
const nodemailer = require('nodemailer');

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

exports.sendMail = async (req, res, next) => {
  console.log(req.params.id)
  const user = await User.findById(req.user._id)
  console.log(req.user)
  const mentor = await User.findById(req.params.id)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  await transporter.sendMail({
    from: `¿Qué estudiar? <${process.env.EMAIL}>`,
    to: mentor.email,
    subject: 'Tienes una nueva solicitud de mentoria',
    text: 'Has recibido este mensaje porque ${user.name} solicita tu ayuda como mentor.',
    html: `<div>
      <p>Has recibido este mensaje porque ${user.name} solicita tu ayuda como mentor.</p>
      <p>Contacta al estudiante en el corel ${user.email}</p>
      </div>`
  })
  res.sendStatus(200).json({ message: `Email sent to ${email}` })
}
