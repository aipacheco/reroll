"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: false,
        unique: true,
    },
});
const Category = (0, mongoose_1.model)("Category", CategorySchema);
exports.default = Category;
