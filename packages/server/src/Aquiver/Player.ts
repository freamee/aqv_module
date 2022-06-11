import { Vec3 } from '@aquiversdk/shared';
import { Config } from '../config';
import { Frameworks } from '../Frameworks';
import { cfxPlayerExist } from '../Methods';

/** Extend this class. */
export class ServerPlayer<IServerVars, ISharedVars> {
    public source: number;
    /** Only serverside safe variables. */
    public serverVariables: Partial<IServerVars> = {};
    /** These variables are set on clientside also. */
    public sharedVariables: Partial<ISharedVars> = {};

    constructor(source: number) {
        this.source = Number(source);

        /** ====================================== */

        this.sharedVariables = new Proxy(this.sharedVariables, {
            set: (self, key, value) => {
                if (self[key] === value) return true;

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

    set heading(h: number) {
        SetEntityHeading(this.playerPed, h);
    }

    /** Getter & Setter for Player position. */
    get position() {
        const [x, y, z] = GetEntityCoords(this.playerPed);
        return new Vec3(x, y, z);
    }

    set position(v: Vec3) {
        SetEntityCoords(this.playerPed, v.x, v.y, v.z, false, false, false, false);
    }

    /**
     * This function adds an item.
     * @param item
     * @param amount
     * @param extra You can add additional framework specified arguments.
     */
    addItem(
        item: string,
        amount: number,
        extra?: {
            QBCore?: { slot?: number; metadata?: Record<string, any> };
        }
    ) {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                Player.addInventoryItem(item, amount);
                break;
            }
            case 'QBCORE': {
                const Player = Frameworks.QBCore.Functions.GetPlayer(this.source);
                Player.Functions.AddItem(item, amount, extra?.QBCore?.slot, extra?.QBCore?.metadata);
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
    removeItem(
        item: string,
        amount: number,
        extra?: {
            QBCore?: { slot?: number };
        }
    ) {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                Player.removeInventoryItem(item, amount);
                break;
            }
            case 'QBCORE': {
                const Player = Frameworks.QBCore.Functions.GetPlayer(this.source);
                Player.Functions.RemoveItem(item, amount, extra?.QBCore?.slot);
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
    getItemAmount(item: string): number {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Item = this.getItem(item) as ESX_Item;
                return Item?.count ?? 0;
            }
            case 'QBCORE': {
                const Item = this.getItem(item) as QBCore_Item;
                return Item?.amount ?? 0;
            }
            case 'CUSTOM': {
                return globalThis.exports[GetCurrentResourceName()].getItemAmount(this.source, item) ?? 0;
            }
        }
    }

    /**
     * This functions gets an inventory item. (**single item**)
     * @param item
     * @returns
     */
    getItem(item: string): ESX_Item | QBCore_Item | any {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                return Player.getInventoryItem(item);
            }
            case 'QBCORE': {
                const Player = Frameworks.QBCore.Functions.GetPlayer(this.source);
                return Player.Functions.GetItemByName(item);
            }
            case 'CUSTOM': {
                return globalThis.exports[GetCurrentResourceName()].getItem(this.source, item);
            }
        }
    }

    /** Get Player's selected account amount. */
    getAccountMoney(accountType: string): number {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                return Player.getAccount(accountType).money ?? 0;
            }
            case 'QBCORE': {
                const Player = Frameworks.QBCore.Functions.GetPlayer(this.source);
                return Player.Functions.GetMoney(accountType) ?? 0;
            }
            case 'CUSTOM': {
                return globalThis.exports[GetCurrentResourceName()].getAccountMoney(this.source, accountType) ?? 0;
            }
        }
    }

    /**
     * Give x amount of the selected accountType to the Player.
     * @param accountType eg. in ESX: "bank", "black_money"
     * @param amount
     * @param extra You can add additional framework specified arguments.
     */
    addAccountMoney(
        accountType: string,
        amount: number,
        extra?: {
            QBCore?: { reason?: string };
        }
    ) {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                Player.addAccountMoney(accountType, amount);
                break;
            }
            case 'QBCORE': {
                const Player = Frameworks.QBCore.Functions.GetPlayer(this.source);
                Player.Functions.AddMoney(accountType, amount, extra?.QBCore?.reason);
                break;
            }
            case 'CUSTOM': {
                globalThis.exports[GetCurrentResourceName()].addAccountMoney(this.source, accountType, amount);
                break;
            }
        }
    }

    removeAccountMoney(
        accountType: string,
        amount: number,
        extra?: {
            QBCore?: { reason?: string };
        }
    ) {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                Player.removeAccountMoney(accountType, amount);
                break;
            }
            case 'QBCORE': {
                const Player = Frameworks.QBCore.Functions.GetPlayer(this.source);
                Player.Functions.RemoveMoney(accountType, amount, extra?.QBCore?.reason);
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
    setAccountMoney(
        accountType: string,
        amount: number,
        extra?: {
            QBCore?: { reason?: string };
        }
    ) {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                Player.setAccountMoney(accountType, amount);
                break;
            }
            case 'QBCORE': {
                const Player = Frameworks.QBCore.Functions.GetPlayer(this.source);
                Player.Functions.SetMoney(accountType, amount, extra?.QBCore?.reason);
                break;
            }
            case 'CUSTOM': {
                globalThis.exports[GetCurrentResourceName()].setAccountMoney(this.source, accountType, amount);
                break;
            }
        }
    }

    /** Get Player's Roleplay Name */
    get name(): string {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                return Player.getName();
            }
            case 'QBCORE': {
                const Player = Frameworks.QBCore.Functions.GetPlayer(this.source);
                return Player.PlayerData.charinfo.firstname + ' ' + Player.PlayerData.charinfo.lastname;
            }
            case 'CUSTOM': {
                return globalThis.exports[GetCurrentResourceName()].getRoleplayName(this.source) ?? 'UNDEFINED_NAME';
            }
        }
    }

    /** Get Player's identifier. */
    get identifier(): string {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                return Player.identifier;
            }
            case 'QBCORE': {
                return Frameworks.QBCore.Functions.GetIdentifier(this.source, 'license');
            }
            case 'CUSTOM': {
                return globalThis.exports[GetCurrentResourceName()].getIdentifier(this.source) ?? '';
            }
        }
    }

    /** Get Player's Unique Id. This is different on every framework. */
    get uniqueId(): string {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                return Player.getIdentifier();
            }
            case 'QBCORE': {
                const Player = Frameworks.QBCore.Functions.GetPlayer(this.source);
                return Player.PlayerData.citizenid;
            }
            case 'CUSTOM': {
                return globalThis.exports[GetCurrentResourceName()].getUniqueId(this.source) ?? '';
            }
        }
    }

    /** Check if player has the specified group. */
    hasPermission(permissionGroup: string): boolean {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                return Player.getGroup() == permissionGroup;
            }
            case 'QBCORE': {
                return Frameworks.QBCore.Functions.HasPermission(this.source, permissionGroup);
            }
            case 'CUSTOM': {
                return globalThis.exports[GetCurrentResourceName()].hasPermission(this.source) ?? false;
            }
        }
    }

    /** Send notification to Player. */
    Notification(message: string) {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
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
        return cfxPlayerExist(this.source);
    }

    /** Trigger clientside event on player. */
    triggerClient(eventName: string, ...args: any[]) {
        emitNet(eventName, this.source, ...args);
    }

    /**
     * Play simple animation on Player.
     * @param dict Animation dictionary
     * @param anim Animation name
     * @param flag Animation flag
     */
    PlayAnimation(dict: string, anim: string, flag: number) {
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
    async PlayAnimationPromise(dict: string, anim: string, flag: number, timeMS: number) {
        this.PlayAnimation(dict, anim, flag);
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, timeMS);
        });
        this.triggerClient('stop-animation');
        return true;
    }

    /** Fade out Player's screen. */
    fadeOutScreen(timeMS: number): Promise<boolean> {
        this.triggerClient('fade-out-screen', timeMS);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, timeMS);
        });
    }

    /** Fade in Player's screen. */
    fadeInScreen(timeMS: number): Promise<boolean> {
        this.triggerClient('fade-in-screen', timeMS);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, timeMS);
        });
    }
}
