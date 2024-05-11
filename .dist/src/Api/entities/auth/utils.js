"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const validateUser = (request) => {
    const { username, email, password } = request;
    const requiredLength = (field, value, min, max) => {
        if (field.length < min) {
            return `${value}debe ser como mínimo ${min} caracteres.`;
        }
        if (field.length > max) {
            return `${value} debe ser máximo de ${max} caracteres.`;
        }
    };
    const isInvalidPassword = (password) => {
        if (password.length < 8 || password.length > 15) {
            return "La contraseña debe tener entre 8 y 15 caracteres";
        }
    };
    const isInvalidEmail = (email) => {
        if (!email) {
            return "Tienes que proporcionar un email";
        }
        const validEmailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmailRegex.test(email)) {
            return "Formato de email inválido.";
        }
    };
    const validationErrors = {
        isInvalidPassword: isInvalidPassword(password),
        isInvalidEmail: isInvalidEmail(email),
    };
    //llamamos a requiredLength solo si username está presente
    if (username) {
        validationErrors.requiredLength = requiredLength(username, "Nombre de usuario ", 3, 20);
    }
    return validationErrors;
};
exports.validateUser = validateUser;
