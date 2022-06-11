"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidJSON = exports.Wait = exports.randomFromArray = exports.randomIndexFromArray = exports.Distance = void 0;
const vector3_1 = require("./../Math/vector3");
/** Get distance between two 3d coordinates. */
function Distance(v, v_2) {
    v = new vector3_1.Vec3(v.x, v.y, v.z);
    v_2 = new vector3_1.Vec3(v_2.x, v_2.y, v_2.z);
    return v.distanceTo(v_2);
}
exports.Distance = Distance;
/** Get random index from array. */
function randomIndexFromArray(array) {
    return Math.floor(Math.random() * array.length);
}
exports.randomIndexFromArray = randomIndexFromArray;
/** Get random value from array. */
function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
exports.randomFromArray = randomFromArray;
/** Async waiter for loops or any other await. */
function Wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
exports.Wait = Wait;
/** Checks if string is valid JSON or not. */
function isValidJSON(value) {
    try {
        if (value) {
            JSON.parse(value);
            return true;
        }
        else
            return false;
    }
    catch (error) {
        return false;
    }
}
exports.isValidJSON = isValidJSON;
