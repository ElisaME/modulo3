const Career = require('../models/Career');

exports.createCareer = (req, res, next) => {
  const {name, description, area, income, field} = req.body
  Career.create({name, description, area, income, field})
  .then((career) => res.status(201).json({ career }))
  .catch((err) => res.status(500).json({ err }));
}

exports.allCareers = (req, res, next) => {
  Career.find()
  .then((careers) => res.status(200).json({ careers }))
  .catch((error) => res.status(500).json({ error }));
}

exports.careerDetail = (req, res, next) => {
  Career.findById(req.params.id)
    .then((career) => res.status(200).json({ career }))
    .catch((error) => res.status(500).json({ error }));
}