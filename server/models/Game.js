const { Schema, model } = require("mongoose");

const playerSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        }, 
        hits: [Number], 
        misses: [Number]

    }
)

const gameSchema = new Schema({
    firstUserId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    secondUserId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    playerOne: playerSchema,
    playerTwo: playerSchema
});

//When a user selects play, FIRST search for a game (FindOneAndUpdate) where secondUserId is Null and add that player to it, otherwise CREATE a game

const Game = model("Game", gameSchema);

module.exports = Game;