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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailToSeller = void 0;
const mailjet = require("node-mailjet").apiConnect(process.env.MAIL_API_KEY, process.env.MAIL_API_SECRET);
const sendEmailToSeller = (sellerEmail, buyerAddress, gamename) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(buyerAddress)
    // console.log(gamename)
    const { name, lastName, streetAddress, city, province, cp } = buyerAddress;
    try {
        const request = yield mailjet.post("send", { version: "v3.1" }).request({
            Messages: [
                {
                    From: {
                        Email: "rerollgamesales@gmail.com",
                    },
                    To: [
                        {
                            Email: sellerEmail,
                        },
                    ],
                    Subject: `Has realizado una venta en Reroll! Has vendido ${gamename}`,
                    TextPart: `Has vendido ${gamename} a ${name} ${lastName} en la dirección ${streetAddress}, ${city}, ${province}, ${cp}`,
                },
            ],
        });
        // console.log(request.body)
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return { error: error.message };
        }
    }
});
exports.sendEmailToSeller = sendEmailToSeller;
