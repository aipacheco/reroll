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
exports.login = exports.register = void 0;
const Service = __importStar(require("./services"));
const register = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = request;
    try {
        const { data, error, details } = yield Service.register(body);
        if (error) {
            return response.status(400).json({
                success: false,
                message: error,
                details,
            });
        }
        return response.status(201).json({
            success: true,
            data,
            message: "Usuario creado correctamente",
        });
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: "Error interno del servidor",
            details: error instanceof Error ? error.message : error,
        });
    }
});
exports.register = register;
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = request;
    const { email, password } = body;
    if (!email || !password) {
        return response.status(400).json({
            success: false,
            message: "Debe introducir todos los datos",
        });
    }
    try {
        const data = yield Service.login(body);
        if (data === null || data === void 0 ? void 0 : data.token) {
            return response.status(201).json({
                success: true,
                message: "Login correcto",
                token: data === null || data === void 0 ? void 0 : data.token,
            });
        }
        if (data === null || data === void 0 ? void 0 : data.error) {
            return response.status(400).json({
                success: false,
                message: data === null || data === void 0 ? void 0 : data.error,
            });
        }
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.login = login;
