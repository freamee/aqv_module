"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPlayer = void 0;
const shared_1 = require("@aquiversdk/shared");
class ClientPlayer {
    constructor() {
        this.sharedVariables = {};
        onNet('player-set-variable', (key, value) => this.EVENT_SetSharedVariable(key, value));
        onNet('play-animation', (dict, anim, flag) => this.EVENT_PlayAnimation(dict, anim, flag));
        onNet('stop-animation', () => this.EVENT_StopAnimation());
        onNet('fade-out-screen', (timeMS) => this.EVENT_FadeOutScreen(timeMS));
        onNet('fade-in-screen', (timeMS) => this.EVENT_FadeInScreen(timeMS));
        this.updatePosition();
        setInterval(() => this.updatePosition(), 100);
    }
    updatePosition() {
        const [x, y, z] = GetEntityCoords(this.playerPed, false);
        this._x = x;
        this._y = y;
        this._z = z;
    }
    get playerPed() {
        return PlayerPedId();
    }
    get position() {
        return new shared_1.Vec3(this._x, this._y, this._z);
    }
    set position(v3) {
        this._x = v3.x;
        this._y = v3.y;
        this._z = v3.z;
        SetEntityCoords(this.playerPed, v3.x, v3.y, v3.z, false, false, false, false);
    }
    get rotation() {
        const [x, y, z] = GetEntityRotation(this.playerPed, 2);
        return new shared_1.Vec3(x, y, z);
    }
    set rotation(rot) {
        SetEntityRotation(this.playerPed, rot.x, rot.y, rot.z, 2, false);
    }
    get heading() {
        return GetEntityHeading(this.playerPed);
    }
    set heading(h) {
        SetEntityHeading(this.playerPed, h);
    }
    EVENT_FadeInScreen(timeMS) {
        DoScreenFadeIn(timeMS);
    }
    EVENT_FadeOutScreen(timeMS) {
        DoScreenFadeOut(timeMS);
    }
    EVENT_SetSharedVariable(key, value) {
        this.sharedVariables[key] = value;
    }
    EVENT_PlayAnimation(dict, anim, flag) {
        return __awaiter(this, void 0, void 0, function* () {
            RequestAnimDict(dict);
            yield new Promise((resolve) => {
                let tries = 0;
                let c = setInterval(() => {
                    if (HasAnimDictLoaded(dict) || tries > 50) {
                        resolve(true);
                        if (c)
                            clearInterval(c);
                    }
                    tries++;
                }, 30);
            });
            TaskPlayAnim(this.playerPed, dict, anim, 8.0, 8.0, -1, flag, 0, false, false, false);
        });
    }
    EVENT_StopAnimation() {
        ClearPedTasksImmediately(this.playerPed);
    }
}
exports.ClientPlayer = ClientPlayer;
