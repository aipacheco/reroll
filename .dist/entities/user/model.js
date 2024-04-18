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
        select: false // Esto hace que la contraseña no se devuelva por defecto
    },
    role: {
        type: String,
        enum: ["user", "admin", "super_admin"],
        default: "user",
    },
    // post:[]
}, {
    timestamps: true,
    versionKey: false,
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
