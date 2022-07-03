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
exports.ServerPlayer = void 0;
const shared_1 = require("@aquiversdk/shared");
const config_1 = require("../config");
const Frameworks_1 = require("../Frameworks");
const Methods_1 = require("../Methods");
/** Extend this class. */
class ServerPlayer {
    constructor(source) {
        /** Only serverside safe variables. */
        this.serverVariables = {};
        /** These variables are set on clientside also. */
        this.sharedVariables = {};
        this.source = Number(source);
        /** ====================================== */
        this.sharedVariables = new Proxy(this.sharedVariables, {
            set: (self, key, value) => {
                if (self[key] === value)
                    return true;
                this.triggerClient('player-set-variable', key, value);
                self[key] = value;
                return true;
            },
        });
    }
    /** Get the Player Ped Handle. */
    get playerPed() {
        return GetPlayerPed(this.source.toString());
    }
    /** Getter & Setter for Player heading. */
    get heading() {
        return GetEntityHeading(this.playerPed);
    }
    set heading(h) {
        SetEntityHeading(this.playerPed, h);
    }
    /** Getter & Setter for Player position. */
    get position() {
        const [x, y, z] = GetEntityCoords(this.playerPed);
        return new shared_1.Vec3(x, y, z);
    }
    set position(v) {
        SetEntityCoords(this.playerPed, v.x, v.y, v.z, false, false, false, false);
    }
    /**
     * This function adds an item.
     * @param item
     * @param amount
     * @param extra You can add additional framework specified arguments.
     */
    addItem(item, amount, extra) {
        var _a, _b;
        switch (config_1.Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks_1.Frameworks.ESX.GetPlayerFromId(this.source);
                if (Player)
                    Player.addInventoryItem(item, amount);
                break;
            }
            case 'QBCORE': {
                const Player = Frameworks_1.Frameworks.QBCore.Functions.GetPlayer(this.source);
                if (Player)
                    Player.Functions.AddItem(item, amount, (_a = extra === null || extra === void 0 ? void 0 : extra.QBCore) === null || _a === void 0 ? void 0 : _a.slot, (_b = extra === null || extra === void 0 ? void 0 : extra.QBCore) === null || _b === void 0 ? void 0 : _b.metadata);
                break;
            }
            case 'CUSTOM': {
                globalThis.exports[GetCurrentResourceName()].addItem(this.source, item, amount);
                break;
            }
        }
    }
    /**
     * This function removes an item from the Player's inventory.
     * @param item
     * @param amount
     * @param extra You can add additional framework specified arguments.
     */
    removeItem(item, amount, extra) {
        var _a;
        switch (config_1.Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks_1.Frameworks.ESX.GetPlayerFromId(this.source);
                if (Player)
                    Player.removeInventoryItem(item, amount);
                break;
            }
            case 'QBCORE': {
                const Player = Frameworks_1.Frameworks.QBCore.Functions.GetPlayer(this.source);
                if (Player)
                    Player.Functions.RemoveItem(item, amount, (_a = extra === null || extra === void 0 ? void 0 : extra.QBCore) === null || _a === void 0 ? void 0 : _a.slot);
                break;
            }
            case 'CUSTOM': {
                globalThis.exports[GetCurrentResourceName()].removeItem(this.source, item, amount);
                break;
            }
        }
    }
    /**
     * This function returns the amount of the item.\
     * If the item is not found then 0 will be returned.
     * @param item
     * @returns
     */
    getItemAmount(item) {
        var _a, _b, _c;
        switch (config_1.Config.Framework) {
            case 'ESX_LEGACY': {
                const Item = this.getItem(item);
                return (_a = Item === null || Item === void 0 ? void 0 : Item.count) !== null && _a !== void 0 ? _a : 0;
            }
            case 'QBCORE': {
                const Item = this.getItem(item);
                return (_b = Item === null || Item === void 0 ? void 0 : Item.amount) !== null && _b !== void 0 ? _b : 0;
            }
            case 'CUSTOM': {
                return (_c = globalThis.exports[GetCurrentResourceName()].getItemAmount(this.source, item)) !== null && _c !== void 0 ? _c : 0;
            }
        }
    }
    /**
     * This functions gets an inventory item. (**single item**)
     * @param item
     * @returns
     */
    getItem(item) {
        switch (config_1.Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks_1.Frameworks.ESX.GetPlayerFromId(this.source);
                if (Player)
                    return Player.getInventoryItem(item);
            }
            case 'QBCORE': {
                const Player = Frameworks_1.Frameworks.QBCore.Functions.GetPlayer(this.source);
                return Player.Functions.GetItemByName(item);
            }
            case 'CUSTOM': {
                return globalThis.exports[GetCurrentResourceName()].getItem(this.source, item);
            }
        }
    }
    /** Get Player's selected account amount. */
    getAccountMoney(accountType) {
        var _a, _b, _c;
        switch (config_1.Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks_1.Frameworks.ESX.GetPlayerFromId(this.source);
                if (Player)
                    return (_a = Player.getAccount(accountType).money) !== null && _a !== void 0 ? _a : 0;
                return 0;
            }
            case 'QBCORE': {
                const Player = Frameworks_1.Frameworks.QBCore.Functions.GetPlayer(this.source);
                if (Player)
                    return (_b = Player.Functions.GetMoney(accountType)) !== null && _b !== void 0 ? _b : 0;
                return 0;
            }
            case 'CUSTOM': {
                return (_c = globalThis.exports[GetCurrentResourceName()].getAccountMoney(this.source, accountType)) !== null && _c !== void 0 ? _c : 0;
            }
        }
    }
    /**
     * Give x amount of the selected accountType to the Player.
     * @param accountType eg. in ESX: "bank", "black_money"
     * @param amount
     * @param extra You can add additional framework specified arguments.
     */
    addAccountMoney(accountType, amount, extra) {
        var _a;
        switch (config_1.Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks_1.Frameworks.ESX.GetPlayerFromId(this.source);
                if (Player)
                    Player.addAccountMoney(accountType, amount);
                break;
            }
            case 'QBCORE': {
                const Player = Frameworks_1.Frameworks.QBCore.Functions.GetPlayer(this.source);
                if (Player)
                    Player.Functions.AddMoney(accountType, amount, (_a = extra === null || extra === void 0 ? void 0 : extra.QBCore) === null || _a === void 0 ? void 0 : _a.reason);
                break;
            }
            case 'CUSTOM': {
                globalThis.exports[GetCurrentResourceName()].addAccountMoney(this.source, accountType, amount);
                break;
            }
        }
    }
    removeAccountMoney(accountType, amount, extra) {
        var _a;
        switch (config_1.Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks_1.Frameworks.ESX.GetPlayerFromId(this.source);
                if (Player)
                    Player.removeAccountMoney(accountType, amount);
                break;
            }
            case 'QBCORE': {
                const Player = Frameworks_1.Frameworks.QBCore.Functions.GetPlayer(this.source);
                if (Player)
                    Player.Functions.RemoveMoney(accountType, amount, (_a = extra === null || extra === void 0 ? void 0 : extra.QBCore) === null || _a === void 0 ? void 0 : _a.reason);
                break;
            }
            case 'CUSTOM': {
                globalThis.exports[GetCurrentResourceName()].removeAccountMoney(this.source, accountType, amount);
                break;
            }
        }
    }
    /**
     * Set Player's account type to a value.
     * @param accountType eg. in ESX: "bank", "black_money"
     * @param amount
     * @param extra You can add additional framework specified arguments.
     * @returns
     */
    setAccountMoney(accountType, amount, extra) {
        var _a;
        switch (config_1.Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks_1.Frameworks.ESX.GetPlayerFromId(this.source);
                if (Player)
                    Player.setAccountMoney(accountType, amount);
                break;
            }
            case 'QBCORE': {
                const Player = Frameworks_1.Frameworks.QBCore.Functions.GetPlayer(this.source);
                if (Player)
                    Player.Functions.SetMoney(accountType, amount, (_a = extra === null || extra === void 0 ? void 0 : extra.QBCore) === null || _a === void 0 ? void 0 : _a.reason);
                break;
            }
            case 'CUSTOM': {
                globalThis.exports[GetCurrentResourceName()].setAccountMoney(this.source, accountType, amount);
                break;
            }
        }
    }
    /** Get Player's Roleplay Name */
    get name() {
        var _a;
        switch (config_1.Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks_1.Frameworks.ESX.GetPlayerFromId(this.source);
                if (Player)
                    return Player.getName();
                return "UNDEFINED_NAME";
            }
            case 'QBCORE': {
                const Player = Frameworks_1.Frameworks.QBCore.Functions.GetPlayer(this.source);
                if (Player)
                    return Player.PlayerData.charinfo.firstname + ' ' + Player.PlayerData.charinfo.lastname;
                return "UNDEFINED_NAME";
            }
            case 'CUSTOM': {
                return (_a = globalThis.exports[GetCurrentResourceName()].getRoleplayName(this.source)) !== null && _a !== void 0 ? _a : 'UNDEFINED_NAME';
            }
        }
    }
    /** Get Player's identifier. */
    get identifier() {
        var _a;
        switch (config_1.Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks_1.Frameworks.ESX.GetPlayerFromId(this.source);
                if (Player)
                    return Player.identifier;
            }
            case 'QBCORE': {
                return Frameworks_1.Frameworks.QBCore.Functions.GetIdentifier(this.source, 'license');
            }
            case 'CUSTOM': {
                return (_a = globalThis.exports[GetCurrentResourceName()].getIdentifier(this.source)) !== null && _a !== void 0 ? _a : '';
            }
        }
    }
    /** Get Player's Unique Id. This is different on every framework. */
    get uniqueId() {
        var _a;
        switch (config_1.Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks_1.Frameworks.ESX.GetPlayerFromId(this.source);
                if (Player)
                    return Player.getIdentifier();
            }
            case 'QBCORE': {
                const Player = Frameworks_1.Frameworks.QBCore.Functions.GetPlayer(this.source);
                if (Player)
                    return Player.PlayerData.citizenid;
            }
            case 'CUSTOM': {
                return (_a = globalThis.exports[GetCurrentResourceName()].getUniqueId(this.source)) !== null && _a !== void 0 ? _a : '';
            }
        }
    }
    /** Check if player has the specified group. */
    hasPermission(permissionGroup) {
        var _a;
        switch (config_1.Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks_1.Frameworks.ESX.GetPlayerFromId(this.source);
                if (Player)
                    return Player.getGroup() == permissionGroup;
            }
            case 'QBCORE': {
                return Frameworks_1.Frameworks.QBCore.Functions.HasPermission(this.source, permissionGroup);
            }
            case 'CUSTOM': {
                return (_a = globalThis.exports[GetCurrentResourceName()].hasPermission(this.source)) !== null && _a !== void 0 ? _a : false;
            }
        }
    }
    /** Send notification to Player. */
    Notification(message) {
        switch (config_1.Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks_1.Frameworks.ESX.GetPlayerFromId(this.source);
                if (Player)
                    Player.showNotification(message);
                break;
            }
            case 'QBCORE': {
                this.triggerClient('QBCore:Notify', message);
                break;
            }
            case 'CUSTOM': {
                globalThis.exports[GetCurrentResourceName()].notification(this.source, message);
                break;
            }
        }
    }
    /** Check if player exist on the server or not. */
    exist() {
        return (0, Methods_1.cfxPlayerExist)(this.source);
    }
    /** Trigger clientside event on player. */
    triggerClient(eventName, ...args) {
        emitNet(eventName, this.source, ...args);
    }
    /**
     * Play simple animation on Player.
     * @param dict Animation dictionary
     * @param anim Animation name
     * @param flag Animation flag
     */
    PlayAnimation(dict, anim, flag) {
        this.triggerClient('play-animation', dict, anim, flag);
    }
    /** Stop Player Animation */
    StopAnimation() {
        this.triggerClient('stop-animation');
    }
    /**
     * Play Player Animation with Promise & await, it will resolve after the timeMS expired.
     * @param dict Animation dictionary
     * @param anim Animation name
     * @param flag Animation flag
     * @param timeMS Time in miliseconds.
     */
    PlayAnimationPromise(dict, anim, flag, timeMS) {
        return __awaiter(this, void 0, void 0, function* () {
            this.PlayAnimation(dict, anim, flag);
            yield new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, timeMS);
            });
            this.triggerClient('stop-animation');
            return true;
        });
    }
    /** Fade out Player's screen. */
    fadeOutScreen(timeMS) {
        this.triggerClient('fade-out-screen', timeMS);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, timeMS);
        });
    }
    /** Fade in Player's screen. */
    fadeInScreen(timeMS) {
        this.triggerClient('fade-in-screen', timeMS);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, timeMS);
        });
    }
}
exports.ServerPlayer = ServerPlayer;
