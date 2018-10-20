'use strict';

// answer-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types
import {playerSchema} from '../players/player-model'

export const playSchema = new Schema({
  defensivePlay: [
    {
      player: playerSchema,
      coordinates: {
        x: Number,
        y: Number
      },
      actions: [
        {
          actionType: {Type: String, enum: ['manCoverage', 'zoneCoverage']},
          params: {
            opposingPlayer: ObjectId,
            point: {
              x: Number,
              y: Number
            },
            radius: Number
          },
          duration: Number
        }
      ]
    }
  ],
  offensivePlay: [
    {
      player: playerSchema,
      coordinates: {
        x: Number,
        y: Number
      },
      actions: [
        {
          actionType: {Type: String, enum: ['runBlock', 'run', 'handOff']},
          params: {
            opposingPlayer: ObjectId,
            direction: {
              x: Number,
              y: Number
            },
            runPoints: [{
                x: Number,
                y: Number
            }],
            playerFrom: ObjectId,
            playerTo: ObjectId
          },
          duration: Number
        }
      ]
    }
  ]
});


const play = mongoose.model('play', playSchema);

export default play;

