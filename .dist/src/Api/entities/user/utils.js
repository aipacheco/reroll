"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameRequiredLength = void 0;
const UsernameRequiredLength = (username, min, max) => {
    if (username.length < min) {
        return { error: `username must be at least ${min} characters long.` };
    }
    if (username.length > max) {
        return { error: `username must be less than ${max} characters.` };
    }
    return { success: true };
};
exports.UsernameRequiredLength = UsernameRequiredLength;
