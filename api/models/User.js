const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, minlength: 4, unique: true },
  password: { type: String, required: true, minlength: 8 },
});

UserSchema.index({ username: 1 });

const UserModel = model('User', UserSchema);

module.exports = UserModel;
