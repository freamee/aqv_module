"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cfxPlayerExist = void 0;
/** Checks if cfx user exist or not. (source) */
function cfxPlayerExist(source) {
    return GetPlayerName(source) != null;
}
exports.cfxPlayerExist = cfxPlayerExist;
