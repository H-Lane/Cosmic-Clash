const { Schema, model } = require("mongoose");

//Create a schema for the ships
const shipSchema = new Schema({
  shipName: {
    type: String,
    required: true,
  },
  position: [Number],
});

//Create the schema that accepts the Users ship grid
const gridSchema = new Schema({
  ships: [shipSchema],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  gameId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Game",
  },
});

//create the sub schema that will allow the userId to be saved along with fields for their hits and misses
const playerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  hits: [Number],
  misses: [Number],
});

//This is the model containing our game. The first two keys are used to hold the information for our players. The turn key holds the userid of the player who is currently taking actions and sending requests, the attacks arrays store all of the attacks a player makes, and the grids arrays store the players ship information.
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
