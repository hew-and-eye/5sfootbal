'use strict';

// answer-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types
import {playSchema} from '../plays/play-model'

// all coordinates are in feet with vertical orientation. top left back of the endzone is (0,0)


const gameSchema = new Schema({
  team1: ObjectId,
  team2: ObjectId,
  timeRemaining: Number,
  posession: {Type: String, enum: ['team1', 'team2']},
  ballPosition: {
    x: Number,
    y: Number
  },
  downNumber: Number,
  firstDownLine: {
    y: Number
  },
  pendingPlay: {
    Type: playSchema
  },
  playHistory: [
    {
      offensivePlay: ObjectId,
      defensivePlay: ObjectId,
      feetGained: Number,
      startDownNumber: Number,
      endDownNumber: Number,
      startBallPosition: {
        x: Number,
        y: Number
      },
      endBallPosition: {
        x: Number,
        y: Number
      },
      startPossesion: {Type: String, enum: ['team1', 'team2']},
      endPossesion: {Type: String, enum: ['team1', 'team2']},
    }
  ]
});




const gameModel = mongoose.model('game', gameSchema);

export default gameModel;
