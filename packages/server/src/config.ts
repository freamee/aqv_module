const DefinedFrameworks = ['ESX_LEGACY', 'QBCORE', 'CUSTOM'] as const;
type SupportedFrameworks = typeof DefinedFrameworks[number];

const DefinedSqls = ['oxmysql', 'mysql-async'] as const;
type SupportedSqls = typeof DefinedSqls[number];

export class Config {
    private static _framework: SupportedFrameworks = 'CUSTOM';
    private static _sqlResource: SupportedSqls = 'oxmysql';

    /** This variable enables or disables the SQL debugger console logs. */
    public static SqlDebug: boolean = true;

    /** Set extra variable(s) which attached to the current resource. */
    public static ResourceExtra: Record<string, any> = {};

    /** Get selected Framework type. */
    public static get Framework() {
        return this._framework;
    }

    /** Select your framework here. */
    public static set Framework(framework: SupportedFrameworks) {
        if (DefinedFrameworks.includes(framework)) {
            this._framework = framework;
        } else {
            this._framework = 'CUSTOM';
            console.warn(`Framework not found: ${framework}. We set it to ${this.Framework} automatically.`);
        }
    }

    public static get sqlResource() {
        return this._sqlResource;
    }

    /** Select your SQL resource here. */
    public static set sqlResource(sql: SupportedSqls) {
        this._sqlResource = sql;
    }
}
