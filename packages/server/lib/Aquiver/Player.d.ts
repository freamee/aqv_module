import { Vec3 } from '@aquiversdk/shared';
/** Extend this class. */
export declare class ServerPlayer<IServerVars, ISharedVars> {
    source: number;
    /** Only serverside safe variables. */
    serverVariables: Partial<IServerVars>;
    /** These variables are set on clientside also. */
    sharedVariables: Partial<ISharedVars>;
    constructor(source: number);
    /** Get the Player Ped Handle. */
    get playerPed(): number;
    /** Getter & Setter for Player heading. */
    get heading(): number;
    set heading(h: number);
    /** Getter & Setter for Player position. */
    get position(): Vec3;
    set position(v: Vec3);
    /**
     * This function adds an item.
     * @param item
     * @param amount
     * @param extra You can add additional framework specified arguments.
     */
    addItem(item: string, amount: number, extra?: {
        QBCore?: {
            slot?: number;
            metadata?: Record<string, any>;
        };
    }): void;
    /**
     * This function removes an item from the Player's inventory.
     * @param item
     * @param amount
     * @param extra You can add additional framework specified arguments.
     */
    removeItem(item: string, amount: number, extra?: {
        QBCore?: {
            slot?: number;
        };
    }): void;
    /**
     * This function returns the amount of the item.\
     * If the item is not found then 0 will be returned.
     * @param item
     * @returns
     */
    getItemAmount(item: string): number;
    /**
     * This functions gets an inventory item. (**single item**)
     * @param item
     * @returns
     */
    getItem(item: string): ESX_Item | QBCore_Item | any;
    /** Get Player's selected account amount. */
    getAccountMoney(accountType: string): number;
    /**
     * Give x amount of the selected accountType to the Player.
     * @param accountType eg. in ESX: "bank", "black_money"
     * @param amount
     * @param extra You can add additional framework specified arguments.
     */
    addAccountMoney(accountType: string, amount: number, extra?: {
        QBCore?: {
            reason?: string;
        };
    }): void;
    removeAccountMoney(accountType: string, amount: number, extra?: {
        QBCore?: {
            reason?: string;
        };
    }): void;
    /**
     * Set Player's account type to a value.
     * @param accountType eg. in ESX: "bank", "black_money"
     * @param amount
     * @param extra You can add additional framework specified arguments.
     * @returns
     */
    setAccountMoney(accountType: string, amount: number, extra?: {
        QBCore?: {
            reason?: string;
        };
    }): void;
    /** Get Player's Roleplay Name */
    get name(): string;
    /** Get Player's identifier. */
    get identifier(): string;
    /** Get Player's Unique Id. This is different on every framework. */
    get uniqueId(): string;
    /** Check if player has the specified group. */
    hasPermission(permissionGroup: string): boolean;
    /** Send notification to Player. */
    Notification(message: string): void;
    /** Check if player exist on the server or not. */
    exist(): boolean;
    /** Trigger clientside event on player. */
    triggerClient(eventName: string, ...args: any[]): void;
    /**
     * Play simple animation on Player.
     * @param dict Animation dictionary
     * @param anim Animation name
     * @param flag Animation flag
     */
    PlayAnimation(dict: string, anim: string, flag: number): void;
    /** Stop Player Animation */
    StopAnimation(): void;
    /**
     * Play Player Animation with Promise & await, it will resolve after the timeMS expired.
     * @param dict Animation dictionary
     * @param anim Animation name
     * @param flag Animation flag
     * @param timeMS Time in miliseconds.
     */
    PlayAnimationPromise(dict: string, anim: string, flag: number, timeMS: number): Promise<boolean>;
    /** Fade out Player's screen. */
    fadeOutScreen(timeMS: number): Promise<boolean>;
    /** Fade in Player's screen. */
    fadeInScreen(timeMS: number): Promise<boolean>;
}
