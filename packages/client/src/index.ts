export * from './config';
export * from './Aquiver';

on('onClientResourceStart', (resourceName: string) => {
    if (GetCurrentResourceName() !== resourceName) return;
    emitNet('player-started-resource', resourceName);
});
