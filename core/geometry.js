
export const geometry = {
    distance(vec1, vec2) {
        return Math.sqrt((vec2[0] - vec1[0])**2 + (vec2[1] - vec1[1])**2)
    }
}