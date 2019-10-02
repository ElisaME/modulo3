const {Schema, model} = require('mongoose');
const PLM = require('passport-local-mongoose')

const userSchema = new Schema({
  email: String,
  profile: {
    ref: 'Profile',
    type: Schema.Types.ObjectId
  },
  category:{
    type: String,
    enum: ['Student', 'Mentor']
  }
},{
  timestamps:true
})

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);