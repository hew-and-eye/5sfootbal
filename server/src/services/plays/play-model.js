'use strict';

// answer-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playSchema = new Schema({
  
});


const playModel = mongoose.model('play', playSchema);

export default playModel;

