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
exports.deleteAddress = exports.updateAddress = exports.getAddressById = exports.getAddressByUser = exports.createAddress = void 0;
const Repository = __importStar(require("./repository"));
const utils_1 = require("./utils");
const createAddress = (body, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const invalidAddress = (0, utils_1.validator)(body, "address");
    if (invalidAddress) {
        return { error: invalidAddress };
    }
    else {
        const { data, error } = yield Repository.createAddress(body, userId);
        if (error) {
            return { error };
        }
        return { data };
    }
});
exports.createAddress = createAddress;
const getAddressByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield Repository.getAddressByUser(userId);
    if (error) {
        return { error };
    }
    return { data };
});
exports.getAddressByUser = getAddressByUser;
const getAddressById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield Repository.getAddressById(id);
    if (error) {
        return { error };
    }
    return { data };
});
exports.getAddressById = getAddressById;
const updateAddress = (id, body, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const invalidAddress = (0, utils_1.validator)(body, "address");
    if (invalidAddress) {
        return { error: invalidAddress };
    }
    else {
        const { data, error } = yield Repository.updateAddress(id, body, userId);
        if (error) {
            return { error };
        }
        return { data };
    }
});
exports.updateAddress = updateAddress;
const deleteAddress = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield Repository.deleteAddress(id, userId);
    if (error) {
        return { error };
    }
    return { data };
});
exports.deleteAddress = deleteAddress;
