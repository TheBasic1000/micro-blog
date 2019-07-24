'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

var User = new Schema({
  username: { type: String, unique: true },
  name: { type: String },
  password: { type: String }
},{
    collection: 'users'
});

// Generate a hash
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);