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
exports.createTransaction = void 0;
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../game/model"));
const model_3 = __importDefault(require("../user/model"));
const model_4 = __importDefault(require("../address/model"));
const createTransaction = (body, buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seller = yield model_2.default.findById(body.game).select("author");
        if (!seller) {
            return { error: "El juego no existe" };
        }
        const findPrice = yield model_2.default.findById(body.game).select("price");
        const buyerAdress = yield model_4.default.findById(body.address);
        const gameName = yield model_2.default.findById(body.game).select("name");
        const sellerEmail = yield model_3.default.findById(seller.author).select("email");
        const transaction = new model_1.default({
            seller: seller,
            price: findPrice === null || findPrice === void 0 ? void 0 : findPrice.price,
            buyer: buyerId,
        });
        const data = yield transaction.save();
        return {
            data: data,
            sellerEmail: sellerEmail === null || sellerEmail === void 0 ? void 0 : sellerEmail.email,
            buyerAdress: buyerAdress,
            gameName: gameName === null || gameName === void 0 ? void 0 : gameName.name,
        };
    }
    catch (error) {
        return { error: error };
    }
});
exports.createTransaction = createTransaction;
