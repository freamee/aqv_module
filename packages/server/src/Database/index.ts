import { Config } from "../config";

export class Database {
    private static _db = null;

    public static queryCounts: number = 0;

    public static get db() {
        if (!this._db) {
            switch (Config.sqlResource) {
                case 'oxmysql': {
                    this._db = globalThis.exports['oxmysql'];
                    break;
                }
                case 'mysql-async': {
                    this._db = globalThis.exports['mysql-async'];
                    break;
                }
                default: {
                    console.error('Undefined sql resource.');
                    break;
                }
            }
        }

        return this._db;
    }

    public static async QueryExecute(query: string, params?: any[]): Promise<any> {
        if (Config.SqlDebug) {
            console.log(`[#${this.queryCounts} ${query}`);
            this.queryCounts++;
        }

        switch (Config.sqlResource) {
            case 'oxmysql': {
                return new Promise((resolve, reject) => {
                    Database.db.query(query, params || [], (result) => {
                        resolve(result);
                    });
                });
            }
            case 'mysql-async': {
                return new Promise((resolve, reject) => {
                    Database.db.mysql_execute(query, params || [], (result) => {
                        resolve(result);
                    });
                });
            }
        }
    }
}

export abstract class BaseDatabase<T, I> {
    constructor(protected tableName: string) {}

    abstract constructModel(row: I): T;

    async query(query: string): Promise<T[]> {
        let rows = await Database.QueryExecute(query);
        if (Array.isArray(rows)) return this.constructModels(rows);
        return rows;
    }

    /** It returns the Object keys & values in a string. (Mysql SET) */
    private mysqlStringSet(obj: Object) {
        let w: string[] | string = [];
        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'string') (w as string[]).push(`${key} = '${value}'`);
            else if (typeof value === 'number' || typeof value === 'boolean') (w as string[]).push(`${key} = ${value}`);
            else if (typeof value === 'undefined' || value == null) (w as string[]).push(`${key} = NULL`);
        });
        return w.join(', ');
    }

    /** It returns the Object keys & values in a string. (Mysql WHERE) */
    private mysqlStringWhere(obj: Object) {
        let w: string[] | string = [];
        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'string') (w as string[]).push(`${key} = '${value}'`);
            else if (typeof value === 'number' || typeof value === 'boolean') (w as string[]).push(`${key} = ${value}`);
        });
        return w.join(' AND ');
    }

    update(d: { where?: Partial<I>; set?: Partial<I> }) {
        let qryString = `UPDATE ${this.tableName}`;
        qryString += ' ';

        if (typeof d.set !== 'undefined' && Object.keys(d.set).length > 0) {
            let setArr = 'SET ' + this.mysqlStringSet(d.set);
            qryString += setArr;
        }

        if (typeof d.where !== 'undefined' && Object.keys(d.where).length > 0) {
            qryString += ' ';
            let whereArr = 'WHERE ' + this.mysqlStringWhere(d.where);
            qryString += whereArr;
        }

        return this.query(qryString);
    }

    find(d: { where: Partial<I>; find?: Array<keyof I>; limit?: number }) {
        let qryString = 'SELECT ';

        if (typeof d.find !== 'undefined' && Array.isArray(d.find)) {
            let findArr = d.find.join(', ');
            qryString += findArr;
        } else {
            qryString += '*';
        }

        qryString += ' ';
        qryString += `FROM ${this.tableName}`;

        if (typeof d.where !== 'undefined' && Object.keys(d.where).length > 0) {
            qryString += ' ';
            let whereArr = 'WHERE ' + this.mysqlStringWhere(d.where);
            qryString += whereArr;
        }

        if (typeof d.limit === 'number' && d.limit > 0) {
            qryString += ' ';
            qryString += `LIMIT ${d.limit}`;
        }

        return this.query(qryString);
    }

    delete(d: { where: Partial<I>; limit?: number }) {
        let qryString = `DELETE FROM ${this.tableName}`;
        qryString += ' ';

        if (typeof d.where === 'undefined' || Object.keys(d.where).length < 1) return console.error('Bad mysql delete trigger.');

        let whereArr = 'WHERE ' + this.mysqlStringWhere(d.where);
        qryString += whereArr;

        if (typeof d.limit === 'number' && d.limit > 0) {
            qryString += ' ';
            qryString += `LIMIT ${d.limit}`;
        }

        return this.query(qryString);
    }

    insert(model: Partial<I>) {
        return Database.QueryExecute(`INSERT INTO ${this.tableName} SET ?`, [model]);
    }

    async exist(w: Partial<I>) {
        if (w && Object.keys(w).length > 0) {
            let qryString = `SELECT count(*) as count FROM ${this.tableName}`;
            qryString += ' ';
            qryString += 'WHERE ' + this.mysqlStringWhere(w);
            qryString += ' ';
            qryString += 'LIMIT 1';

            const res = await Database.QueryExecute(qryString);
            if (res && res[0]) {
                return res[0].count > 0 ? true : false;
            }
        }
    }

    private constructModels(rows: any) {
        return rows.map((a) => this.constructModel(a));
    }

    all() {
        return this.query(`SELECT * FROM ${this.tableName}`);
    }

    async count(): Promise<number> {
        const response = await Database.QueryExecute(`SELECT COUNT(*) as total FROM ${this.tableName}`) as any;
        if(response && response[0]) {
            return Number(response[0].total);
        }

        return 0;
    }
}
