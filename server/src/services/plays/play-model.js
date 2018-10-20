'use strict';

// answer-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types

export const playSchema = new Schema({
  defensivePlay: [
    {
      player: {
        stats: {
          size: Number,
          strength: Number,
          speed: Number,
          skill: Number,
          smart: Number
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
        ],
        jerseyNumber: Number
      }
    }
  ],
  offensivePlay: [

  ]
});


const play = mongoose.model('play', playSchema);

export default play;

