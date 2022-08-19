import axios from "axios";
import { Config } from "../config";

export function checkVersion() {
    if (Config.checkResourceVersion) {
        setImmediate(async () => {
            try {
                const resourceName = GetCurrentResourceName();
                const response = await axios.get(`http://54.38.164.215:8097/scriptversion/${resourceName}`);

                const newVersion = response?.data?.version;
                const currentVersion = GetResourceMetadata(resourceName, "version", 0);


                if (newVersion > currentVersion) {
                    console.log(`^6There is an update available for ${resourceName}.`);
                    console.log(`^6Your version: ${currentVersion} New version: ${newVersion}`)
                    console.log(`^6Please download the newer version from https://keymaster.fivem.net/`);
                    console.log(`^6If you have any question(s), feel free to ask on our Discord server!`);
                    console.log(`^6https://discord.gg/X5XNvckuXK`);
                }

            }
            catch (e) { }
        });
    }
}