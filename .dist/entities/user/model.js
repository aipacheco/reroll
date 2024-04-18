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
        select: false,
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
    chats: [{ type: mongoose_1.Types.ObjectId, ref: "Chat" }],
    saved: [{ type: mongoose_1.Types.ObjectId, ref: "Game" }],
    address: [{ type: mongoose_1.Types.ObjectId, ref: "Address" }],
}, {
    timestamps: true,
    versionKey: false,
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
