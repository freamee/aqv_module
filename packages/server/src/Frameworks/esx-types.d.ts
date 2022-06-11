interface ESX_SERVER {
    /** This function returns an array of all users. You can use this function to filter players to find specific types of people such as police or admins. */
    GetExtendedPlayers(type?: 'job' | 'group', search?: string): ESX_Player[];
    /** This function gets a ESX player object from a server id. Returns nil for invalid players. */
    GetPlayerFromId(source: string | number): ESX_Player;
    /** This function returns the ESX player from the Rockstar identifier. Returns nil if no player is found. */
    GetPlayerFromIdentifier(identifier: string): ESX_Player;
    /** This function returns an array of all online players ID's. */
    GetPlayers(): string | number[];
    /** This function is to force a player to use an item. */
    UseItem(source: string | number, itemName: string): void;
    /** This function registers an item as usable. */
    RegisterUsableItem(item: string, cb: Function): void;
    /** This function returns an item label. */
    GetItemLabel(item: string): string;
}

interface ESX_Item {
    name: string;
    count: number;
    label: string;
    weight: number;
    usable: boolean;
    rare: boolean;
    canRemove: boolean;
}

interface ESX_Account {
    name: string;
    money: number;
    label: string;
}

interface ESX_Job {
    id: number;
    name: string;
    label: string;
    grade: number;
    grade_name: string;
    grade_label: string;
    grade_salary: number;
    skin_male: any;
    skin_female: any;
}

interface ESX_Player {
    /** Player identifier */
    identifier: string;
    /** Player Coordinates */
    coords: { x: number; y: number; z: number };
    /** Player group */
    group: string;
    /** Player source ID */
    source: string | number;
    /** Player variables. */
    variables: Record<string, any>;

    /** Set variable. */
    set(key: string, value: any): void;
    /** Get variable. */
    get(key: string): any;

    /** This function adds Money Instead the specified account. */
    addAccountMoney(account: string, money: number): number;
    /** This function adds an inventory item. */
    addInventoryItem(item: string, count: number): void;
    /** This function adds money. */
    addMoney(amount: number): void;
    /** This function adds a weapon. */
    addWeapon(weaponName: string, ammo: number): void;
    /** This function adds the parsed ammo to the player weapon */
    addWeaponAmmo(weaponName: string, ammo: number): void;
    /**This function adds a weapon component to a weapon, if the player has it, the available component list can be found in the weapon configuration file. */
    addWeaponComponent(weaponName: string, weaponComponent: string): void;
    /** This function is used to determinate if a player can carry an item, and is the successor to the previous item limit checks */
    canCarryItem(item: string, count: number): void;
    /**This function gets details (returned in an table) for an account. */
    getAccount(accountType: string): ESX_Account;
    /** This function gets all registered player accounts. */
    getAccounts(): ESX_Account;
    /** This function gets the current player group. */
    getGroup(): string;
    /** This function returns the Rockstar identifier used */
    getIdentifier(): string;
    /** This function gets an inventory item. */
    getInventoryItem(item: string): ESX_Item;
    /** This function returns the current player job object. */
    getJob(): ESX_Job;
    /** This function gets the current cash balance. */
    getMoney(): number;
    /** If you have ESX identity Installed, This will return the Character Name, If not, it will return the FiveM name. */
    getName(): string;
    /** This functions returns the current player weight in a number type, can be used to do calculations. */
    getWeight(): number;
    /** This functions checks if the player has the specified item, if they do, it will return item and item count :) */
    hasItem(item: string, metadata?: any): boolean;
    /** This functions returns if the player has the specified weapon. */
    hasWeapon(weaponName: string): boolean;
    /** This functions returns an boolean if the player has the specified weapon component for a given weapon. The available component list can be found in the weapon configuration file (config.weapons.lua). */
    hasWeaponComponent(weaponName: string, weaponComponent: string): boolean;
    /** This function kicks a player with a reason. */
    kick(reason?: string): void;
    /** This function removes account money. */
    removeAccountMoney(accountType: string, amount: number): void;
    /** This function removes an inventory item. */
    removeInventoryItem(item: string, amount: number): void;
    removeMoney(amount: number): void;
    /** This function removes a weapon from the player. */
    removeWeapon(weaponName: string): void;
    /** This function removes the parsed ammo to the player weapon */
    removeWeaponAmmo(weaponName: string, ammoCount: number): void;
    /** This function removes a weapon component from a player, if the player has it. The available component list can be found in the weapon configuration file (config.weapons.lua). */
    removeWeaponComponent(weaponName: string, weaponComponent: string): void;
    /** This function sets money for an account. */
    setAccountMoney(accountType: string, amount: number): void;
    /** This function sets an inventory item count */
    setInventoryItem(item: string, amount: number): void;
    /** This functions sets the player job, the job must be defined in the jobs database table. */
    setJob(name: string, grade: string | number): void;
    /** This functions sets the max weight that the player can hold in their inventory. */
    setMaxWeight(maxWeight: number): void;
    /** This function sets the player cash balance. */
    setMoney(amount: number): void;
    /** This function sets the player name. */
    setName(newName: string): void;
    /** This function shows a help notification with a message. These help notification support displaying button inputs, see this list */
    showHelpNotification(msg: string, thisFrame?: boolean, beep?: boolean, duration?: number): void;
    /** This function shows a basic notification to the player. */
    showNotification(msg: string, flash?: boolean, saveToBreif?: boolean, hudColorIndex?: number): void;
    /** This function triggers an client event for the player. */
    triggerEvent(eventName: string, ...args: any[]): void;
}
