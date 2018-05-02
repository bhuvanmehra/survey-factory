const mongoose = require('mongoose');
const { Schema } = mongoose; // mongoose library has a property named Schema. Assign it to a variabke named Schema

const userSchema = new Schema({
  //Can pass just the type or an object with multiple properties
  googleId: String,
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);
