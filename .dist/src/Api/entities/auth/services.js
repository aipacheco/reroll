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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const utils_1 = require("./utils");
const Repository = __importStar(require("./repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const userErrors = (0, utils_1.validateUser)(body);
    if (userErrors.requiredLength ||
        userErrors.isInvalidPassword ||
        userErrors.isInvalidEmail) {
        return { error: "Datos de registro inválidos", details: userErrors };
    }
    const { username, email, password } = body;
    const passEncript = bcrypt_1.default.hashSync(password, 12);
    const newUser = {
        username,
        email,
        password: passEncript,
    };
    const { data, error } = yield Repository.register(newUser);
    if (error) {
        return { error };
    }
    return { data };
});
exports.register = register;
const login = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body;
    const { user, error } = yield Repository.login(email);
    if (error) {
        return { error: error };
    }
    if (user) {
        const hashedPassword = user.password;
        if (typeof hashedPassword === "string") {
            const isValidPassword = bcrypt_1.default.compareSync(password, hashedPassword);
            if (isValidPassword) {
                const token = jsonwebtoken_1.default.sign({
                    userId: user._id,
                    role: user.role,
                    username: user.username,
                }, process.env.JWT_SECRET, {
                    expiresIn: "730h",
                });
                return { token: token };
            }
            else {
                return { error: "Contraseña incorrecta" };
            }
        }
    }
});
exports.login = login;
