"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const DefinedFrameworks = ['ESX_LEGACY', 'QBCORE', 'CUSTOM'];
const DefinedSqls = ['oxmysql', 'mysql-async'];
class Config {
    /** Get selected Framework type. */
    static get Framework() {
        return this._framework;
    }
    /** Select your framework here. */
    static set Framework(framework) {
        if (DefinedFrameworks.includes(framework)) {
            this._framework = framework;
        }
        else {
            this._framework = 'CUSTOM';
            console.warn(`Framework not found: ${framework}. We set it to ${this.Framework} automatically.`);
        }
    }
    static get sqlResource() {
        return this._sqlResource;
    }
    /** Select your SQL resource here. */
    static set sqlResource(sql) {
        this._sqlResource = sql;
    }
}
exports.Config = Config;
Config._framework = 'CUSTOM';
Config._sqlResource = 'oxmysql';
/** This variable enables or disables the SQL debugger console logs. */
Config.SqlDebug = true;
/** Set extra variable(s) which attached to the current resource. */
Config.ResourceExtra = {};
/** Enable or disable resource version checker. (Works through our API.) */
Config.checkResourceVersion = true;
