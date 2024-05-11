"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GameSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    category: { type: mongoose_1.Types.ObjectId, ref: "Category" },
    status: {
        type: String,
        enum: ["Disponible", "Reservado", "Vendido"],
        default: "Disponible",
    },
}, {
    timestamps: true,
    versionKey: false,
});
const Game = (0, mongoose_1.model)("Game", GameSchema);
exports.default = Game;
