"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = exports.createCategory = void 0;
const model_1 = __importDefault(require("./model"));
const createCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const existingName = yield model_1.default.findOne({ name: name }).exec();
    if (existingName) {
        return { error: "La categoría ya existe" };
    }
    const categoryCreated = yield model_1.default.create({ name: name });
    return { data: categoryCreated };
});
exports.createCategory = createCategory;
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield model_1.default.find().exec();
    if (categories.length === 0) {
        return { error: "No existen categorías" };
    }
    return { data: categories };
});
exports.getAllCategories = getAllCategories;
