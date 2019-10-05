const {Schema, model} = require('mongoose');

const careerSchema = new Schema ({
  name:String,
  description:String,
  area:String,
  income:String,
  field:String
})

module.exports = model('Career', careerSchema);