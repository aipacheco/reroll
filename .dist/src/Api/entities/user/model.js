"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
        default: "https://res.cloudinary.com/dptbxi3iu/image/upload/v1714633611/reroll/8e65207aca8751179e10e03c_rw_600_ih2nk1_tozov6.png"
    },
    description: {
        type: String,
        default: "¡Hola! Soy nuevo en re:roll!",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    chats: [{ type: mongoose_1.Types.ObjectId, ref: "Chat" }],
    saved: [{ type: mongoose_1.Types.ObjectId, ref: "Game" }],
    address: [{ type: mongoose_1.Types.ObjectId, ref: "Address" }],
}, {
    timestamps: true,
    versionKey: false,
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
