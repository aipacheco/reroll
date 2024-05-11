"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
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
        case "lastName": {
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
        case "cp": {
            if (value < 0) {
                return "El código postal deben ser números positivos.";
            }
            if (value.toString().length !== 5) {
                return "El código postal debe tener 5 dígitos.";
            }
            return "";
        }
        case "city": {
            if (!regexName.test(value)) {
                return `La ciudad tiene que estar formada por caracteres correctos (sólo números y letras).`;
            }
            if (value.length < 3) {
                return `La ciudad tiene que ser mínimo de 3 letras.`;
            }
            if (value.length > 50) {
                return `La ciudadtiene que ser máximo 50 letras.`;
            }
            return "";
        }
        case "streetAddress": {
            if (value.length < 3) {
                return `La dirección tiene que ser mínimo de 3 letras.`;
            }
            if (value.length > 50) {
                return `La dirección tiene que ser máximo 50 letras.`;
            }
            return "";
        }
        case "province": {
            if (value.length < 3) {
                return `La dirección tiene que ser mínimo de 3 letras.`;
            }
            if (value.length > 50) {
                return `La dirección tiene que ser máximo 50 letras.`;
            }
            return "";
        }
        default:
            console.log("pues ok");
    }
};
exports.validator = validator;
