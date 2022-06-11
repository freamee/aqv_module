/** Checks if cfx user exist or not. (source) */
export function cfxPlayerExist(source: string | number) {
    return GetPlayerName(source as string) != null;
}