"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = exports.createCategory = void 0;
const Services = __importStar(require("./services"));
const createCategory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = request;
    try {
        const { data, error, details } = yield Services.createCategory(body);
        if (data) {
            return response.status(201).json({
                success: true,
                data,
                message: "Categoría creada correctamente",
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                /*para devolver solo el mensaje accediendo directamente a invalid
                porque se ha creado así en services*/
                message: details === null || details === void 0 ? void 0 : details.invalid,
                error: error
            });
        }
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: "Error interno del servidor",
            details: error instanceof Error ? error.message : error,
        });
    }
});
exports.createCategory = createCategory;
const getAllCategories = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield Services.getAllCategories();
        if (data) {
            return response.status(200).json({
                success: true,
                data,
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: "no existen categorías",
                error: error
            });
        }
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: "Error interno del servidor",
            details: error instanceof Error ? error.message : error,
        });
    }
});
exports.getAllCategories = getAllCategories;
