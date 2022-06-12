"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const DefinedFrameworks = ['ESX_LEGACY', 'QBCORE', 'CUSTOM'];
class Config {
    /** Get selected Framework type. */
    static get Framework() {
        return this._framework;
    }
    /** Set selected Framework type. */
    static set Framework(framework) {
        if (DefinedFrameworks.includes(framework)) {
            this._framework = framework;
        }
        else {
            this._framework = 'CUSTOM';
            console.warn(`Framework not found: ${framework}. We set it to ${this.Framework} automatically.`);
        }
    }
}
exports.Config = Config;
Config._framework = 'CUSTOM';
/** Set extra variable(s) which attached to the current resource. */
Config.ResourceExtra = {};
