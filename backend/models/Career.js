const {Schema, model} = require('mongoose');

const careerSchema = new Schema ({
  name:String,
  description:String,
  area:String,
  income:String,
  field:String,
  // users_id:{
  //   type:Schema.Types.ObjectId,
  //   ref:"User"
  // }
})

module.exports = model('Career', careerSchema);