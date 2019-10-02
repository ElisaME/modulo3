const { Schema, model } = require('mongoose');

const profileSchema = new Schema ({
  name:String,
  image: {
    type: String,
    default: 'https://icons-for-free.com/iconfiles/png/512/avatar+person+profile+user+icon-1320166578424287581.png'
  },
  careers: [String],
  test_hermann:{
    type: [String],
    enum: ['A' , 'B', 'C', 'D']
  },
  biography: String,
  degree: String
},{
  timestamps:true
})

module.exports = model ('Profile', profileSchema);