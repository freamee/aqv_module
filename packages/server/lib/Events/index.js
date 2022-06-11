"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
exports.Events = {
    ESX: {
        /** First argument is source ID. */
        PlayerLoaded: "esx:playerLoaded"
    },
    QBCORE: {
        /** First argument is QBPlayer */
        PlayerLoaded: "QBCore:Server:PlayerLoaded"
    },
    Player: {
        /** This event gets called when the Player's clientside resource loaded.
         * First argument will be the **resourceName**\
         * **It is important to check the resource name!**
         */
        StartedResource: "player-started-resource"
    }
};
