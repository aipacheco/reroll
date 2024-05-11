import { Schema, Types, model } from "mongoose"

const ChatSchema = new Schema(
  {
    sender: { type: Types.ObjectId, ref: "User", required: true },
    recipient: { type: Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Chat = model("Chat", ChatSchema)

export default Chat
