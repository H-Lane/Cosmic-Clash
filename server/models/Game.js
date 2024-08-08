const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
    firstUserId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    secondUserId: {
        type: Schema.Types.ObjectId,
        required: true
    },
});

//When a user selects play, FIRST search for a game (FindOneAndUpdate) where secondUserId is Null and add that player to it, otherwise CREATE a game

const Game = model("Game", gameSchema);

module.exports = Game;