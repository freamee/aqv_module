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
exports.checkVersion = void 0;
const axios_1 = require("axios");
const config_1 = require("../config");
function checkVersion() {
    if (config_1.Config.checkResourceVersion) {
        setImmediate(() => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const resourceName = GetCurrentResourceName();
                const response = yield axios_1.default.get(`http://54.38.164.215:8097/scriptversion/${resourceName}`);
                const newVersion = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.version;
                const currentVersion = GetResourceMetadata(resourceName, "version", 0);
                if (newVersion > currentVersion) {
                    console.log(`^6There is an update available for ${resourceName}.`);
                    console.log(`^6Your version: ${currentVersion} New version: ${newVersion}`);
                    console.log(`^6Please download the newer version from https://keymaster.fivem.net/`);
                    console.log(`^6If you have any question(s), feel free to ask on our Discord server!`);
                    console.log(`^6https://discord.gg/X5XNvckuXK`);
                }
            }
            catch (e) { }
        }));
    }
}
exports.checkVersion = checkVersion;
