"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFloating = exports.generateBoolean = exports.generateInt = void 0;
function generateInt(min, max) {
    if (typeof min !== 'number' || typeof max !== 'number') {
        console.info(`randomInteger min or max is not a number!`);
        return 0;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.generateInt = generateInt;
function generateBoolean(chance) {
    if (typeof chance !== 'number') {
        console.warn(`randomBoolean chance is not a number!`);
        return false;
    }
    if (chance < 0 || chance > 100) {
        console.warn(`randomBoolean chance must be between 0-100!`);
        return false;
    }
    return (Math.random() * 100) < chance;
}
exports.generateBoolean = generateBoolean;
function generateFloating(min, max, decimals = 3) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}
exports.generateFloating = generateFloating;
