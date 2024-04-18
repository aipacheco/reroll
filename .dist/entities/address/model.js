"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AddressSchema = new mongoose_1.Schema({
    streetAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    cp: {
        type: Number,
        required: true,
    },
});
const Address = (0, mongoose_1.model)("Address", AddressSchema);
exports.default = Address;
