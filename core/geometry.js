
export const geometry = {
    distance(p1, p2) {
        const toXY = (v) => Array.isArray(v) ? [v[0], v[1]] : [v.x, v.y]
        const [x1, y1] = toXY(p1)
        const [x2, y2] = toXY(p2)
        return Math.hypot(x2 - x1, y2 - y1)
    }
}