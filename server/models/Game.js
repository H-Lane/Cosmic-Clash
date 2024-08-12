const { Schema, model } = require("mongoose");

//Create a schema for the ships
const shipSchema = new Schema({
    shipName: {
        type: String,
        required: true,
    },
    position: [Number],
  });
  
  
  //Create the schema that accepts the Users Home Grid with their ship placements
  const gridSchema = new Schema({
    ships: [shipSchema],
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    gameId: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Game'
    },
  });

const playerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
    },
    hits: [Number],
    misses: [Number]
});

const gameSchema = new Schema({
    playerOne: [playerSchema],
    playerTwo: [playerSchema],
    turn: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    firstAttacks: [Number],
    secondAttacks: [Number], 
    winner: {
        type: Schema.Types.ObjectId,
    },
    playerOneGrid: [gridSchema], 
    playerTwoGrid: [gridSchema],
});

//When a user selects play, FIRST search for a game (FindOneAndUpdate) where secondUserId is Null and add that player to it, otherwise CREATE a game

const Game = model("Game", gameSchema);

module.exports = Game;