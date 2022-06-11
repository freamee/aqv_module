interface QBCORE_SERVER {
    Functions: QBCore_Functions;
}

interface QBCore_Functions {
    /** Get a specific identifier of a player. */
    GetIdentifier(source: string | number, identifierType?: string): string;
    /** Get a players source by identifer */
    GetSource(identifier: string): number | string;
    /** Get a player by their source and access their data */
    GetPlayer(source: string | number): QBCore_Player;
    /** Get a player by their citizen id and access their data (must be online) */
    GetPlayerByCitizenId(citizenId: string): QBCore_Player;
    /** Get a player by their phone number (must be online) */
    GetPlayerByPhone(number: string): QBCore_Player;
    /** Get all player IDs in the server (deprecated method) */
    GetPlayers(): string[] | number[];
    /** Access the table of all active players on the server (preferred to above) */
    GetQBPlayers(): QBCore_Player[];
    /** Register an item as usable in the core */
    CreateUseableItem(item: string, cb: Function): void;
    /** Check if an item is registered as usable before attempting use */
    CanUseItem(item: string): boolean;
    /** Trigger an item to be used on the player */
    UseItem(source: string | number, item: string): void;
    /** Kick a player from the server */
    Kick(source: string | number, reason: string, setKickReason: boolean, defferals: boolean): void;
    /** Check if a player has the permission level needed */
    HasPermission(source: string | number, permission: string): boolean;
}

interface QBCore_Player {
    PlayerData: {
        charinfo: {
            firstname: string;
            phone: string;
            lastname: string;
            backstory: string;
            birthdate: string;
            cid: string;
            gender: number;
            account: string;
            nationality: string;
        };
        license: string;
        source: number;
        cid: string;
        citizenid: string;
        money: Record<any, number>;
    };

    Functions: {
        AddMoney(moneyType: string, amount: number, reason?: string): boolean;
        RemoveMoney(moneyType: string, amount: number, reason?: string): boolean;
        SetMoney(moneyType: string, amount: number, reason?: string): boolean;
        GetMoney(moneyType: string): number;
        AddItem(item: string, amount: number, slot?: number, metadata?: Record<string, any>): boolean;
        RemoveItem(item: string, amount: number, slot?: number): boolean;
        ClearInventory(): void;
        GetItemByName(item: string): QBCore_Item;
        GetItemsByName(item: string): QBCore_Item[];
        GetItemBySlot(slot: number): QBCore_Item;
        Save(): void;
    };
}

interface QBCore_Item {
    name: string;
    amount: number;
    info: string;
    label: string;
    description: string;
    weight: number;
    type: string;
    unique: string;
    useable: boolean;
    image: string;
    shouldClose: boolean;
    slot: number;
    combinable: boolean;
}
