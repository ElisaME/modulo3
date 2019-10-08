const {Schema, model} = require('mongoose');

const careerSchema = new Schema ({
  name:String,
  description:String,
  area:String,
  income:String,
  field:String
},{
  timestamps:true
})

module.exports = model('Career', careerSchema);