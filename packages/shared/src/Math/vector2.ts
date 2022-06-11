export default class Vec2 {
    constructor(public x: number = 0, public y: number = 0) { }

    distanceTo(v: Vec2) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    distanceToSquared(v: Vec2) {
        const dx = this.x - v.x,
            dy = this.y - v.y;
        return dx * dx + dy * dy;
    }
    
}
