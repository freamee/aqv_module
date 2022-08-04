export declare class Database {
    private static _db;
    static queryCounts: number;
    static get db(): any;
    static QueryExecute(query: string, params?: any[]): Promise<any>;
}
export declare abstract class BaseDatabase<T, I> {
    tableName: string;
    constructor(tableName: string);
    abstract constructModel(row: I): T;
    query(query: string): Promise<T[]>;
    /** It returns the Object keys & values in a string. (Mysql SET) */
    private mysqlStringSet;
    /** It returns the Object keys & values in a string. (Mysql WHERE) */
    private mysqlStringWhere;
    update(d: {
        where?: Partial<I>;
        set?: Partial<I>;
    }): Promise<T[]>;
    find(d: {
        where: Partial<I>;
        find?: Array<keyof I>;
        limit?: number;
    }): Promise<T[]>;
    deleteAll(limit?: number): Promise<T[]>;
    delete(d: {
        where: Partial<I>;
        limit?: number;
    }): void | Promise<T[]>;
    insert(model: Partial<I>): Promise<any>;
    exist(w: Partial<I>): Promise<boolean>;
    private constructModels;
    all(): Promise<T[]>;
    count(): Promise<number>;
}
