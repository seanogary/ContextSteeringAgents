export const psi_default = (angle) => {
    return Math.exp((-0.5)*angle**2)
}

export const g_default = (distance) => {
    min(1, max(0, -1/450 * (distance - 500)))
}


export const testWidth = 800;
export const testHeight = 500;