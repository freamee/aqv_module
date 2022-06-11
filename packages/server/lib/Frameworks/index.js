"use strict";
/// <reference path="esx-types.d.ts" />
/// <reference path="qbcore-types.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frameworks = void 0;
class Frameworks {
    static get ESX() {
        if (!this._ESX) {
            this._ESX = globalThis.exports['es_extended'].getSharedObject();
        }
        return this._ESX;
    }
    static get QBCore() {
        if (!this._QBCORE) {
            this._QBCORE = globalThis.exports['qb-core'].GetCoreObject();
        }
        return this._QBCORE;
    }
}
exports.Frameworks = Frameworks;
Frameworks._ESX = null;
Frameworks._QBCORE = null;
