const {Schema, model} = require('mongoose');

const eventSchema = new Schema ({
  host_id:{
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  place:String,
  duration:{
    type:String,
    enum:['30 min', '1 hr', '1hr 30min', '2 hr']
  },
  students:[{
    type: Schema.Types.ObjectId,
    ref:'User'
  }],
  description:String,
  total_students:Number,
  date:String,
  hour:String
},
{
  timestamps:true
})

module.exports = model('Event', eventSchema);