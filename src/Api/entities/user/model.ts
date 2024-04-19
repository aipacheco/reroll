import { Schema, Types, model } from "mongoose"

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true, 
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    chats: [{ type: Types.ObjectId, ref: "Chat" }],
    saved: [{ type: Types.ObjectId, ref: "Game" }],
    address: [{ type: Types.ObjectId, ref: "Address" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const User = model("User", UserSchema)

export default User
