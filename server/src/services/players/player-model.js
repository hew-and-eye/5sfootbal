'use strict';

// answer-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types

// all coordinates are in feet with vertical orientation. top left back of the endzone is (0,0)


export const playerSchema = new Schema({
  name: String,
  stats: {
    size: Number,
    strength: Number,
    speed: Number,
    skill: Number,
    smart: Number
  },
  jerseyNumber: Number,
  position: String,
  teamId: ObjectId
});




const playerModel = mongoose.model('player', playerSchema);

export default playerModel;
