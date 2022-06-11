import { Vec3 } from './../Math/vector3';

/** Get distance between two 3d coordinates. */
export function Distance(v: { x: number; y: number; z: number }, v_2: { x: number; y: number; z: number }) {
    v = new Vec3(v.x, v.y, v.z);
    v_2 = new Vec3(v_2.x, v_2.y, v_2.z);

    return (v as Vec3).distanceTo(v_2 as Vec3);
}

/** Get random index from array. */
export function randomIndexFromArray(array: any[]) {
    return Math.floor(Math.random() * array.length);
}

/** Get random value from array. */
export function randomFromArray<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
}

/** Async waiter for loops or any other await. */
export function Wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

/** Checks if string is valid JSON or not. */
export function isValidJSON(value: string) {
    try {
        if (value) {
            JSON.parse(value);
            return true;
        } else return false;
    } catch (error) {
        return false;
    }
}