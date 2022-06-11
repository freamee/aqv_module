"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }
    distanceToSquared(v) {
        const dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    }
}
exports.default = Vec2;
