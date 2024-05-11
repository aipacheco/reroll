"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GameSchema = new mongoose_1.Schema({
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
    category: { type: mongoose_1.Types.ObjectId, ref: "Category" },
}, {
    timestamps: true,
    versionKey: false,
});
const Game = (0, mongoose_1.model)("Game", GameSchema);
exports.default = Game;
