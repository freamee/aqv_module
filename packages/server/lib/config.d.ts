declare const DefinedFrameworks: readonly ["ESX_LEGACY", "QBCORE", "CUSTOM"];
declare type SupportedFrameworks = typeof DefinedFrameworks[number];
declare const DefinedSqls: readonly ["oxmysql", "mysql-async"];
declare type SupportedSqls = typeof DefinedSqls[number];
export declare class Config {
    private static _framework;
    private static _sqlResource;
    /** This variable enables or disables the SQL debugger console logs. */
    static SqlDebug: boolean;
    /** Set extra variable(s) which attached to the current resource. */
    static ResourceExtra: Record<string, any>;
    /** Get selected Framework type. */
    static get Framework(): SupportedFrameworks;
    /** Select your framework here. */
    static set Framework(framework: SupportedFrameworks);
    static get sqlResource(): SupportedSqls;
    /** Select your SQL resource here. */
    static set sqlResource(sql: SupportedSqls);
}
export {};
