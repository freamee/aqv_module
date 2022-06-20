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
exports.BaseDatabase = exports.Database = void 0;
const config_1 = require("../config");
class Database {
    static get db() {
        if (!this._db) {
            switch (config_1.Config.sqlResource) {
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
    static QueryExecute(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (config_1.Config.SqlDebug) {
                console.log(`[#${this.queryCounts} ${query}`);
                this.queryCounts++;
            }
            switch (config_1.Config.sqlResource) {
                case 'oxmysql': {
                    return new Promise((resolve, reject) => {
                        Database.db.query(query, params || [], (result) => {
                            resolve(result);
                        });
                    });
                }
                case 'mysql-async': {
                    return new Promise((resolve, reject) => {
                        Database.db.mysql_fetch_all(query, params || [], (result) => {
                            resolve(result);
                        });
                    });
                }
            }
        });
    }
}
exports.Database = Database;
Database._db = null;
Database.queryCounts = 0;
class BaseDatabase {
    constructor(tableName) {
        this.tableName = tableName;
    }
    query(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let rows = yield Database.QueryExecute(query);
            if (Array.isArray(rows))
                return this.constructModels(rows);
            return rows;
        });
    }
    /** It returns the Object keys & values in a string. (Mysql SET) */
    mysqlStringSet(obj) {
        let w = [];
        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'string')
                w.push(`${key} = '${value}'`);
            else if (typeof value === 'number' || typeof value === 'boolean')
                w.push(`${key} = ${value}`);
            else if (typeof value === 'undefined' || value == null)
                w.push(`${key} = NULL`);
        });
        return w.join(', ');
    }
    /** It returns the Object keys & values in a string. (Mysql WHERE) */
    mysqlStringWhere(obj) {
        let w = [];
        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'string')
                w.push(`${key} = '${value}'`);
            else if (typeof value === 'number' || typeof value === 'boolean')
                w.push(`${key} = ${value}`);
        });
        return w.join(' AND ');
    }
    update(d) {
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
    find(d) {
        let qryString = 'SELECT ';
        if (typeof d.find !== 'undefined' && Array.isArray(d.find)) {
            let findArr = d.find.join(', ');
            qryString += findArr;
        }
        else {
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
    delete(d) {
        let qryString = `DELETE FROM ${this.tableName}`;
        qryString += ' ';
        if (typeof d.where === 'undefined' || Object.keys(d.where).length < 1)
            return console.error('Bad mysql delete trigger.');
        let whereArr = 'WHERE ' + this.mysqlStringWhere(d.where);
        qryString += whereArr;
        if (typeof d.limit === 'number' && d.limit > 0) {
            qryString += ' ';
            qryString += `LIMIT ${d.limit}`;
        }
        return this.query(qryString);
    }
    insert(model) {
        return Database.QueryExecute(`INSERT INTO ${this.tableName} SET ?`, [model]);
    }
    exist(w) {
        return __awaiter(this, void 0, void 0, function* () {
            if (w && Object.keys(w).length > 0) {
                let qryString = `SELECT count(*) as count FROM ${this.tableName}`;
                qryString += ' ';
                qryString += 'WHERE ' + this.mysqlStringWhere(w);
                qryString += ' ';
                qryString += 'LIMIT 1';
                const res = yield Database.QueryExecute(qryString);
                if (res && res[0]) {
                    return res[0].count > 0 ? true : false;
                }
            }
        });
    }
    constructModels(rows) {
        return rows.map((a) => this.constructModel(a));
    }
    all() {
        return this.query(`SELECT * FROM ${this.tableName}`);
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield Database.QueryExecute(`SELECT COUNT(*) as total FROM ${this.tableName}`);
            if (response && response[0]) {
                return Number(response[0].total);
            }
            return 0;
        });
    }
}
exports.BaseDatabase = BaseDatabase;
