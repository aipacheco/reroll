import { Schema, Types, model } from "mongoose"

const GameSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    playersMin: {
      type: Number,
    },
    playersMax: {
      type: Number,
    },
    image1: { type: String },
    image2: { type: String },
    image3: { type: String },
    price: { type: Number, required: true },
    category: { type: Types.ObjectId, ref: "Category" },
    status: {
      type: String,
      enum: ["Disponible", "Reservado", "Vendido"],
      default: "Disponible",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Game = model("Game", GameSchema)

export default Game
