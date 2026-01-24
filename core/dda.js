import { geometry } from "./geometry.js";
import { display } from "../world/display.js";

export const DDA = {
    getVerticalIntersections(start, end) {
        const x0 = start.x / display.tileSize;
        const y0 = start.y / display.tileSize;
        const length = geometry.distance(start, end) / display.tileSize;
        const uX = (end.x - start.x) / geometry.distance(start, end);
        const uY = (end.y - start.y) / geometry.distance(start, end);
        let delta = 0;
        let n = 0;
        let intersections = [];
        const stepDir = Math.sign(end.x - start.x);
        
        while (true) {
            const nextGridX = stepDir > 0 ? Math.floor(x0) + 1 + n : Math.ceil(x0) - 1 - n;
            delta = (nextGridX - x0) / uX;
            
            if (Math.abs(delta) > length) break;
            if (n > 100) break;
            
            intersections.push({
                x: (x0 + uX * delta) * display.tileSize,
                y: (y0 + uY * delta) * display.tileSize,
            });
            n += 1;
        }
        return intersections;
    },

    getHorizontalIntersections(start, end) {
        const x0 = start.x / display.tileSize;
        const y0 = start.y / display.tileSize;
        const length = geometry.distance(start, end) / display.tileSize;
        const uX = (end.x - start.x) / geometry.distance(start, end);
        const uY = (end.y - start.y) / geometry.distance(start, end);
        let delta = 0;
        let n = 0;
        let intersections = [];
        const stepDir = Math.sign(end.y - start.y);
    
        while (true) {
            const nextGridY = stepDir > 0 ? Math.floor(y0) + 1 + n : Math.ceil(y0) - 1 - n;
            delta = (nextGridY - y0) / uY;
        
            if (Math.abs(delta) > length) break;
            if (n > 100) break;
        
            intersections.push({
                x: (x0 + uX * delta) * display.tileSize,
                y: (y0 + uY * delta) * display.tileSize,
            });
            n += 1;
        }
        return intersections;
    },

}