export const psi_default = (angle) => {
    return Math.exp((-0.5)*angle**2)
}

export const g_default = (distance) => {
    console.log("DISTANCE:")
    console.log(distance);
    const maxRange = 20; // tiles
    return Math.max(0, 1 - distance / maxRange);
}


export const testWidth = 800;
export const testHeight = 500;