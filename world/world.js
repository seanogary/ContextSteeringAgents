import { display } from './display.js'
import { ctx } from "./display.js"
import { renderer } from '../simulation/renderer.js'


export const world = {
    material: null,
    agents: null,
    init(numTilesX, numTilesY) {
        let material = Array(numTilesX).fill(0).map(() => Array(numTilesY).fill(0))
        this.material = material;
        this.agents = [];
    },

    getCellState(cellX, cellY) {
        return world.material[cellY][cellX];
    },

    updateCellState(cell, mode = null) {
        let currState = this.getCellState(cell.x, cell.y);

        world.material[cell.y][cell.x] = 
            currState == 1 && mode == 'draw' 
            ? 1 
            : Number(!currState);
        
        renderer.renderWorld(ctx, display, world); 
        renderer.drawGrid(ctx, display);
    
    }
}
