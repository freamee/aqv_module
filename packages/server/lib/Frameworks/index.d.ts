/// <reference path="../../src/Frameworks/esx-types.d.ts" />
/// <reference path="../../src/Frameworks/qbcore-types.d.ts" />
export declare class Frameworks {
    private static _ESX;
    private static _QBCORE;
    static get ESX(): ESX_SERVER;
    static get QBCore(): QBCORE_SERVER;
}
