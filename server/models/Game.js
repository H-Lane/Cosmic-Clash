const { Schema, model } = require("mongoose");

//This is the model containing our game. The first two keys are used to hold the information for our players. The turn key holds the userid of the player who is currently taking actions and sending requests, the attacks arrays store all of the attacks a player makes, and the grids arrays store the players ship information.
const gameSchema = new Schema({
  playerOne: { 
    type: Schema.Types.ObjectId,
    required: true
  },
  playerTwo: Schema.Types.ObjectId,
  
  turn: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  //Utilize these attacks arrays to determine if a player has won and conditionally display where the user has been attacked
  firstAttacks: [Number],
  secondAttacks: [Number],
  winner: {
    type: Schema.Types.ObjectId,
  },
  playerOneGrid: {
    type: Schema.Types.ObjectId,
    ref: "Grid"
  },
  playerTwoGrid: {
    type: Schema.Types.ObjectId,
    ref: "Grid"
  },
});

//When a user selects play, FIRST search for a game (FindOneAndUpdate) where secondUserId is Null and add that player to it, otherwise CREATE a game

const Game = model("Game", gameSchema);

module.exports = Game;
