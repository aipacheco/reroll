import { Schema, Types, model } from "mongoose"

const TransactionSchema = new Schema(
  {
    buyer: { type: Types.ObjectId, ref: "User", required: true },
    seller: { type: Types.ObjectId, ref: "User", required: true },
    game: { type: Types.ObjectId, ref: "Game" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Transaction = model("Transaction", TransactionSchema)

export default Transaction
