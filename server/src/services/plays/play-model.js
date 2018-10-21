'use strict';

// answer-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types
import { playerSchema } from '../players/player-model'

export const playSchema = new Schema({
  offensivePlay: [
    {
      player: playerSchema,
      coordinates: {
        x: Number,
        y: Number
      },
      actions: [
        {
          actionType: { Type: String, enum: ['runBlock', 'run', 'handOff'] },
          params: {
            opposingPlayer: Number,
            direction: {
              x: Number,
              y: Number
            },
            runPoints: [{
              x: Number,
              y: Number
            }],
            playerFrom: Number,
            playerTo: Number
          },
          duration: Number
        }
      ]
    }
  ],
  defensivePlay: [
    {
      player: playerSchema,
      coordinates: {
        x: Number,
        y: Number
      },
      actions: [
        {
          actionType: { Type: String, enum: ['manCoverage', 'zoneCoverage', 'blitz'] },
          params: {
            opposingPlayer: Number, //index in players array, 0-4 linemen, 5-9 skillposition, 10qb
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
});


const play = mongoose.model('play', playSchema);

export default play;

