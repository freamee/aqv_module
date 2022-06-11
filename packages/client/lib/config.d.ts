declare const DefinedFrameworks: readonly ["ESX_LEGACY", "QBCORE", "CUSTOM"];
declare type SupportedFrameworks = typeof DefinedFrameworks[number];
export declare class Config {
    private static _framework;
    /** Get selected Framework type. */
    static get Framework(): SupportedFrameworks;
    /** Set selected Framework type. */
    static set Framework(framework: SupportedFrameworks);
}
export {};
