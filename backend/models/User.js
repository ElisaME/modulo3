const {Schema, model} = require('mongoose');
const PLM = require('passport-local-mongoose')

const userSchema = new Schema({
  email: String,
  profile: {
    type:Schema.Types.ObjectId,
    ref: 'Profile'
  }
},{
  timestamps:true
})

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);