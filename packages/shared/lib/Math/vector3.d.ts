export declare class Vec3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    add(vec: Vec3): this;
    distanceTo(v: Vec3): number;
    distanceToSquared(v: Vec3): number;
    multiplyScalar(scalar: number): this;
    length(): number;
    divideScalar(scalar: number): this;
    normalize(): this;
    dot(v: Vec3): number;
    /** Check if this Vector3 is between two another. */
    isBetween(A: Vec3, B: Vec3, epsilon: number): boolean;
}
