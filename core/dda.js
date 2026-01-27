import { geometry } from "./geometry.js";

export const DDA = {
    getVerticalIntersections(start, end, display) {
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

    getHorizontalIntersections(start, end, display) {
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

    getCells(start, end, display) {
        const x0 = start.x / display.tileSize;
        const y0 = start.y / display.tileSize;
        const length = geometry.distance(start, end) / display.tileSize;
        const uX = (end.x - start.x) / geometry.distance(start, end);
        const uY = (end.y - start.y) / geometry.distance(start, end);
        let nV = 0;
        let nH = 0;
        let n = 0;
        const currCellObj = display.getCellFromCoords(start.x, start.y);
        let currCell = [currCellObj.y, currCellObj.x]
        const stepDirX = Math.sign(end.x - start.x);
        const stepDirY = Math.sign(end.y - start.y);
        let cells = [currCell];
        while (true) {
            const nextGridY = stepDirY > 0 ? Math.floor(y0) + 1 + nH : Math.ceil(y0) - 1 - nH;
            const nextGridX = stepDirX > 0 ? Math.floor(x0) + 1 + nV : Math.ceil(x0) - 1 - nV;
            const deltaY = (nextGridY - y0) / uY;
            const deltaX = (nextGridX - x0) / uX; 
        
            if (Math.abs(deltaX) > length && Math.abs(deltaY) > length) break;
            if (n > 100) break; 
        
            let newCell;
            if (Math.abs(deltaX) < Math.abs(deltaY)) { // vertical hit - step in X
                newCell = [
                    currCell[0],
                    currCell[1] + stepDirX
                ]
                nV += 1;
            } else { // horizontal hit - step in Y
                newCell = [
                    currCell[0] + stepDirY,
                    currCell[1]
                ]
                nH += 1;
            }
            cells.push(newCell);
            currCell = newCell;
            n += 1;
        }
        return cells;
    },

    castRay(start, end, display, world) {
        const x0 = start.x / display.tileSize;
        const y0 = start.y / display.tileSize;
        const uX = (end.x - start.x) / geometry.distance(start, end);
        const uY = (end.y - start.y) / geometry.distance(start, end);
        let nV = 0;
        let nH = 0;
        let n = 0;
        const currCellObj = display.getCellFromCoords(start.x, start.y);
        let currCell = [currCellObj.y, currCellObj.x]
        const stepDirX = Math.sign(end.x - start.x);
        const stepDirY = Math.sign(end.y - start.y);
        let cells = [currCell];
        let distance;
        while (true) {
            const nextGridY = stepDirY > 0 ? Math.floor(y0) + 1 + nH : Math.ceil(y0) - 1 - nH;
            const nextGridX = stepDirX > 0 ? Math.floor(x0) + 1 + nV : Math.ceil(x0) - 1 - nV;
            const deltaY = (nextGridY - y0) / uY;
            const deltaX = (nextGridX - x0) / uX;
        
            if (n > 100) break; 
            
            let newCell;
            if (Math.abs(deltaX) < Math.abs(deltaY)) { // vertical hit - step in X
                newCell = [
                    currCell[0],
                    currCell[1] + stepDirX
                ]
                nV += 1;
            } else { // horizontal hit - step in Y
                newCell = [
                    currCell[0] + stepDirY,
                    currCell[1]
                ]
                nH += 1;
            }

            distance = Math.abs(deltaX) < Math.abs(deltaY) ? Math.abs(deltaX) : Math.abs(deltaY);

            // Check out of bounds
            if (!world.material || newCell[0] < 0 || newCell[0] >= world.material.length || 
                newCell[1] < 0 || newCell[1] >= world.material[0].length) {
                return {
                    cells: cells,
                    distance: distance,
                };
            }

            if (world.getCellState(newCell[1], newCell[0]) == 1) {
                return {
                    cells: cells,
                    distance: distance,
                };
            }

            cells.push(newCell);
            currCell = newCell;
            n += 1;
        }
    },
}