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
exports.sendEmailOnDelete = exports.sendEmailOnCreate = exports.validator = void 0;
const mailjet = require("node-mailjet").apiConnect(process.env.MAIL_API_KEY, process.env.MAIL_API_SECRET);
const validator = (value, type) => {
    const regexName = /^[a-zA-Z0-9 áéíóúÁÉÍÓÚ]+$/;
    switch (type) {
        case "name": {
            if (!regexName.test(value)) {
                return `El nombre tiene que estar formado por caracteres correctos (sólo números y letras).`;
            }
            if (value.length < 3) {
                return `El nombre tiene que ser mínimo de 3 letras.`;
            }
            if (value.length > 50) {
                return `El nombre tiene que ser máximo 50 letras.`;
            }
            return "";
        }
        case "description": {
            //si es mayor de 180 letras
            if (value.length > 180) {
                return `la descripción tiene que ser máximo 180 caracteres.`;
            }
            return "";
        }
        case "price": {
            if (value < 0) {
                return "El precio no puede ser negativo.";
            }
            return "";
        }
        case "playersMin": {
            if (value < 1) {
                return "El número mínimo de jugadores no puede ser inferior a 1.";
            }
            return "";
        }
        case "playersMax": {
            if (value < 1) {
                return "El número máximo de jugadores no puede ser inferior a 1.";
            }
            return "";
        }
        default:
            console.log("pues ok");
    }
};
exports.validator = validator;
const sendEmailOnCreate = (sellerEmail, game) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, playersMin, playersMax, price } = game;
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
                    Subject: `Has subido un anuncio en Reroll!`,
                    TextPart: `Tu anuncio del juego ${name} ha sido subido correctamente. 
          Estos son los detalles de tu anuncio:
            -Nombre del juego: ${name}
            -Precio: ${price}
            -Descripción: ${description}
            -Número mínimo de jugadores: ${playersMin}
            -Número máximo de jugadores: ${playersMax}
          ¡Buena suerte con la venta!`,
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
exports.sendEmailOnCreate = sendEmailOnCreate;
const sendEmailOnDelete = (sellerEmail, reason, game) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price } = game;
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
                    Subject: `Tu anuncio ha sido borrado de nuestra base de datos`,
                    TextPart: `Tu anuncio del juego ${name} ha sido borrado por la siguiente razón: 
          ${reason}. 
          Estos son los detalles de tu anuncio:
            -Nombre del juego: ${name}
            -Precio: ${price}
            -Descripción: ${description}
          Puedes volver a subir tu anuncio si lo deseas, o ponerte en contacto con nosotros.
          ¡Gracias por confiar en Reroll!`,
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
exports.sendEmailOnDelete = sendEmailOnDelete;
