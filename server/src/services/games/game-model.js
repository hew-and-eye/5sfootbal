'use strict';

// answer-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  pendingPlay: {
    offense: {
      playId: Schema.Types.ObjectId,
      teamId: Schema.Types.ObjectId
    },
    defense: {
      playId: Schema.Types.ObjectId,
      teamId: Schema.Types.ObjectId
    },
  }
});


const gameModel = mongoose.model('game', gameSchema);

export default gameModel;
