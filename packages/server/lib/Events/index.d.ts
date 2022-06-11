export declare const Events: {
    ESX: {
        /** First argument is source ID. */
        PlayerLoaded: string;
    };
    QBCORE: {
        /** First argument is QBPlayer */
        PlayerLoaded: string;
    };
    Player: {
        /** This event gets called when the Player's clientside resource loaded.
         * First argument will be the **resourceName**\
         * **It is important to check the resource name!**
         */
        StartedResource: string;
    };
};
