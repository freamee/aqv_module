export default class Vec2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    distanceTo(v: Vec2): number;
    distanceToSquared(v: Vec2): number;
}
