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
exports.deleteAddress = exports.updateAddress = exports.getAddressById = exports.getAddressByUser = exports.createAddress = void 0;
const model_1 = __importDefault(require("../user/model"));
const model_2 = __importDefault(require("./model"));
const createAddress = (body, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const ID = yield model_1.default.findById(userId);
    const { name, lastName, streetAddress, city, province, cp } = body;
    if (!ID) {
        return { error: "Usuario no encontrado" };
    }
    const newAddress = yield model_2.default.create({
        owner: userId,
        name,
        lastName,
        streetAddress,
        city,
        province,
        cp,
    });
    return { data: newAddress };
});
exports.createAddress = createAddress;
const getAddressByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const ID = yield model_1.default.findById(userId);
    if (!ID) {
        return { error: "Usuario no encontrado" };
    }
    const userAddress = yield model_2.default.find({ owner: userId }).exec();
    return { data: userAddress };
});
exports.getAddressByUser = getAddressByUser;
const getAddressById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield model_2.default.findById(id).exec();
    if (!address) {
        return { error: "Dirección no encontrada" };
    }
    return { data: address };
});
exports.getAddressById = getAddressById;
const updateAddress = (id, body, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, streetAddress, city, province, cp } = body;
    const address = yield model_2.default.findOne({ _id: id, owner: userId }).exec();
    if (!address) {
        return {
            error: "Dirección no encontrada o no tienes permiso para actualizarla",
        };
    }
    address.name = name;
    address.lastName = lastName;
    address.streetAddress = streetAddress;
    address.city = city;
    address.province = province;
    address.cp = cp;
    const updatedAddress = yield address.save();
    return { data: updatedAddress };
});
exports.updateAddress = updateAddress;
const deleteAddress = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield model_2.default.findOneAndDelete({
        _id: id,
        owner: userId,
    }).exec();
    if (!address) {
        return {
            error: "Dirección no encontrada o no tienes permiso para borrarla",
        };
    }
    return { data: address };
});
exports.deleteAddress = deleteAddress;
