import { Vec3 } from "@aquiversdk/shared";
export declare class ClientPlayer<ISharedVars> {
    sharedVariables: Partial<ISharedVars>;
    private _x;
    private _y;
    private _z;
    constructor();
    private updatePosition;
    get playerPed(): number;
    get position(): Vec3;
    set position(v3: Vec3);
    get rotation(): Vec3;
    set rotation(rot: Vec3);
    get heading(): number;
    set heading(h: number);
    private EVENT_FadeInScreen;
    private EVENT_FadeOutScreen;
    private EVENT_SetSharedVariable;
    private EVENT_PlayAnimation;
    private EVENT_StopAnimation;
}
