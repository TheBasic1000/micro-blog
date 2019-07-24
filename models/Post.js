'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Post = new Schema({
  author_username: {type: String},
  author_name: {type: String},
  content: {type: String},
  tags: [{type: String}],
  time: {type: String}
},{
    collection: 'posts'
});

module.exports = mongoose.model('Post', Post);