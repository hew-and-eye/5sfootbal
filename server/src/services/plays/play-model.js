'use strict';

// answer-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types
import { playerSchema } from '../players/player-model'

const coordinateSchema = new Schema({
  x: Number,
  y: Number
})

export const playSchema = new Schema({
  play: [
    {
      team: { Type: { String, enum: ['Offense', 'Defense'] } },
      teamName: String,
      teamId: ObjectId,
      player: playerSchema,
      coordinates: coordinateSchema,
      coordinatesMovie: [
        coordinateSchema
      ],
      physics: {
        d: coordinateSchema,
        v: coordinateSchema,
        a: coordinateSchema,
        m: Number,
        vMax: Number
      },
      actions: [
        {
          actionType: { Type: String, enum: ['runBlock', 'run', 'handOff', 'manCoverage', 'zoneCoverage', 'blitz'] },
          params: {
            opposingPlayer: Number,
            direction: coordinateSchema,
            runPoints: [coordinateSchema],
            playerFrom: Number,
            playerTo: Number,
            point: coordinateSchema,
            radius: Number
          },
          duration: Number
        }
      ]
    }
  ]
});


const play = mongoose.model('play', playSchema);

export default play;

