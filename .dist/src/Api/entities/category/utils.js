"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validName = void 0;
const validName = (body) => {
    const { name } = body;
    const invalid = (field, value, min, max) => {
        if (field.length < min) {
            return `${value} debe ser como mínimo ${min} caracteres.`;
        }
        if (field.length > max) {
            return `${value} debe ser máximo de ${max} caracteres.`;
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/.test(field)) {
            return `${value} solo debe contener letras.`;
        }
    };
    const validationError = { invalid: invalid(name, "categoría", 3, 20) };
    return validationError;
};
exports.validName = validName;
