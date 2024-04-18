"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TransactionSchema = new mongoose_1.Schema({
    buyer: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    game: { type: mongoose_1.Types.ObjectId, ref: "Game" },
}, {
    timestamps: true,
    versionKey: false,
});
const Transaction = (0, mongoose_1.model)("Transaction", TransactionSchema);
exports.default = Transaction;
