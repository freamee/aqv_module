/** Get distance between two 3d coordinates. */
export declare function Distance(v: {
    x: number;
    y: number;
    z: number;
}, v_2: {
    x: number;
    y: number;
    z: number;
}): number;
/** Get random index from array. */
export declare function randomIndexFromArray(array: any[]): number;
/** Get random value from array. */
export declare function randomFromArray<T>(array: T[]): T;
/** Async waiter for loops or any other await. */
export declare function Wait(ms: number): Promise<void>;
/** Checks if string is valid JSON or not. */
export declare function isValidJSON(value: string): boolean;
