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
    avatar: {
      type: String,
      default:"https://res.cloudinary.com/dptbxi3iu/image/upload/v1714460936/8e65207aca8751179e10e03c_rw_600_ih2nk1.png"
    },
    description: {
      type: String,
      default: "¡Hola! Soy nuevo en re:roll!",
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
