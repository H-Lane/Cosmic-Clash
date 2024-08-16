const { Schema, model } = require("mongoose");

//Create a schema for the ships array
const shipSchema = new Schema({
  shipName: {
    type: String,
    required: true,
  },
  position: [Number],
});

//Create the schema that accepts the Users ship array and their Id. gameId is optional and will be updated accordingly. gameId is an array so the user can save their grid to multiple games for future development
const gridSchema = new Schema({
  ships: [shipSchema],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    //ref: "User",
  },
});

const Grid = model(`Grid`, gridSchema);

module.exports = Grid;
