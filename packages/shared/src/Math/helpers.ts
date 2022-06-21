export function generateInt(min: number, max: number) {
    if (typeof min !== 'number' || typeof max !== 'number') {
        console.info(`randomInteger min or max is not a number!`);
        return 0;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateBoolean(chance: number) {
    if (typeof chance !== 'number') {
        console.warn(`randomBoolean chance is not a number!`);
        return false;
    }

    if (chance < 0 || chance > 100) {
        console.warn(`randomBoolean chance must be between 0-100!`);
        return false;
    }

    return (Math.random() * 100) < chance;
}

export function generateFloating(min: number, max: number, decimals: number = 3) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
}