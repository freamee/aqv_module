import { Vec3 } from "@aquiversdk/shared";

export class ClientPlayer<ISharedVars> {
    public sharedVariables: Partial<ISharedVars> = {};

    private _x: number;
    private _y: number;
    private _z: number;

    constructor() {
        onNet('player-set-variable', (key: string, value: any) => this.EVENT_SetSharedVariable(key, value));
        onNet('play-animation', (dict: string, anim: string, flag: number) => this.EVENT_PlayAnimation(dict, anim, flag));
        onNet('stop-animation', () => this.EVENT_StopAnimation());
        onNet('fade-out-screen', (timeMS: number) => this.EVENT_FadeOutScreen(timeMS));
        onNet('fade-in-screen', (timeMS: number) => this.EVENT_FadeInScreen(timeMS));

        this.updatePosition();
        setInterval(() => this.updatePosition(), 100);
    }

    private updatePosition() {
        const [x, y, z] = GetEntityCoords(this.playerPed, false);
        this._x = x;
        this._y = y;
        this._z = z;
    }

    public get playerPed() {
        return PlayerPedId();
    }

    public get position() {
        return new Vec3(this._x, this._y, this._z);
    }

    public set position(v3: Vec3) {
        this._x = v3.x;
        this._y = v3.y;
        this._z = v3.z;
        SetEntityCoords(this.playerPed, v3.x, v3.y, v3.z, false, false, false, false);
    }

    public get rotation() {
        const [x, y, z] = GetEntityRotation(this.playerPed, 2);
        return new Vec3(x, y, z);
    }

    public set rotation(rot: Vec3) {
        SetEntityRotation(this.playerPed, rot.x, rot.y, rot.z, 2, false);
    }

    public get heading() {
        return GetEntityHeading(this.playerPed);
    }

    public set heading(h: number) {
        SetEntityHeading(this.playerPed, h);
    }

    private EVENT_FadeInScreen(timeMS: number) {
        DoScreenFadeIn(timeMS);
    }

    private EVENT_FadeOutScreen(timeMS: number) {
        DoScreenFadeOut(timeMS);
    }

    private EVENT_SetSharedVariable(key: string, value: any) {
        this.sharedVariables[key] = value;
    }

    private async EVENT_PlayAnimation(dict: string, anim: string, flag: number) {
        RequestAnimDict(dict);
        await new Promise((resolve) => {
            let tries = 0;
            let c = setInterval(() => {
                if (HasAnimDictLoaded(dict) || tries > 50) {
                    resolve(true);
                    if (c) clearInterval(c);
                }
                tries++;
            }, 30);
        });

        TaskPlayAnim(this.playerPed, dict, anim, 8.0, 8.0, -1, flag, 0, false, false, false);
    }

    private EVENT_StopAnimation() {
        ClearPedTasksImmediately(this.playerPed);
    }
}
