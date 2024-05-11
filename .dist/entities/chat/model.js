"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    recipient: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
const Chat = (0, mongoose_1.model)("Chat", ChatSchema);
exports.default = Chat;
