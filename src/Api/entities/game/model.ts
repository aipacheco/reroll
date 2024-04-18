import { Schema, Types, model } from "mongoose"

const GameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    playersMin: {
      type: Number,
    },
    playersMax: {
      type: Number,
    },
    category: { type: Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Game = model("Game", GameSchema)

export default Game
