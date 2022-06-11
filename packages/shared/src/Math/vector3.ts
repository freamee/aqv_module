export class Vec3 {

    constructor(public x: number = 0, public y: number = 0, public z: number = 0) { }

    add(vec: Vec3) {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        return this;
    }

    distanceTo(v: Vec3) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    distanceToSquared(v: Vec3) {
        const dx = this.x - v.x,
            dy = this.y - v.y,
            dz = this.z - v.z;

        return dx * dx + dy * dy + dz * dz;
    }

    multiplyScalar(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;

        return this;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    divideScalar(scalar: number) {
        return this.multiplyScalar(1 / scalar);
    }

    normalize() {
        return this.divideScalar(this.length() || 1);
    }

    dot(v: Vec3) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    /** Check if this Vector3 is between two another. */
    isBetween(A: Vec3, B: Vec3, epsilon: number) {
        const testTo1 = new Vec3(A.x - this.x, A.y - this.y, A.z - this.z).normalize();
        const testTo2 = new Vec3(B.x - this.x, B.y - this.y, B.z - this.z).normalize();

        const d = testTo1.dot(testTo2);

        return d < (-1.0 + epsilon) && d > (-1.0 - epsilon);
    }
}