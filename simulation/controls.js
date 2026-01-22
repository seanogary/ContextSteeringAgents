import { display, ctx } from '../world/display.js';
import { world } from '../world/world.js';
import { renderer } from './renderer.js';
import { simulation } from './simulation.js'
import { geometry } from '../core/geometry.js';
import { deepEqual } from '../core/core.js';

export const controls = {
    animating: false,
    animationId: null,
    movingMouse: null,
    currentMousePosition: null,
    mouseTravelDistance: 0,
    drawing: false,
    mousedown: false,
    currentCell: null,
    currentCellVal: null,
    isPainted: null,
    activeMode: "DDAVisualizationMode",

    draw() {
        if (!this.animating) return;
        display.resizeCanvas();
        simulation.renderFrame(ctx, display, world, renderer)
        this.animationId = requestAnimationFrame(() => this.draw());
    },

    startSimulation() {
        if (this.animating) return;
        this.animating = true;
        simulation.start(display, world, renderer);
        this.draw();
    },

    stopSimulation() {
        cancelAnimationFrame(this.animationId);
        this.animating = false;
        this.animationId = null;
        simulation.stop()
    },

    isEnteringNewCell(x, y) {
        return !deepEqual(this.currentCell, display.getCellFromCoords(x, y)) 
    },

    registerMousemove(x, y) {
        if (modes[this.activeMode].mousemove) {
            Object.assign(this, modes[this.activeMode].mousemove(x, y)); 
        }

        if (this.isEnteringNewCell(x,y)) {
            this.currentCell = display.getCellFromCoords(x,y);
            this.currentCellVal = world.getCellState(this.currentCell.x, this.currentCell.y);
        }

        if (this.drawing && !this.currentCellVal) {
            this.colorCell();
        }

        if (this.currentMousePosition && this.mousedown) {
            this.mouseTravelDistance = 
            this.mouseTravelDistance + geometry.distance(
                this.currentMousePosition,
                [x, y]
            );
        }


        if (this.mouseTravelDistance > display.canvasHeight/display.tileDimensions[0]) {
            this.drawing = true;
        }

        this.currentMousePosition = [x,y];
    },

    registerMousedown() {
        this.mousedown = true;
        if (!this.currentCellVal) {
            this.colorCell();
            this.isPainted = true;
        } else {
            this.isPainted = false;
        }
    },

    registerMouseup() {
        if (this.currentCellVal && !this.drawing && !this.isPainted) {
            this.colorCell();
        }
        this.currentMousePosition = null;
        this.mouseTravelDistance = 0;
        this.drawing = false;
        this.mousedown = false;
        // this.colorCell();
    },

    colorCell(){
        world.updateCellState(this.currentCell, this.drawing ? 'draw' : null);
    },

    init() {
        display.resizeCanvas();
        display.init();
        world.init(...display.tileDimensions);
        renderer.drawGrid(ctx, display);
    },

    updateResolution(inc, type) {
        if (type === 'inc') display.increaseResolution(inc);
        if (type === 'dec') display.decreaseResolution(inc);
        world.init(...display.tileDimensions);
        display.clear();
        display.resizeCanvas(); /// WTF WTF WTF (THIS SOLVES A PROBLEM)
        renderer.drawGrid(ctx, display);
    },

    registerModeSelection(mode) {
        console.log(mode)
    },
}

const modes = {
    DDAVisualizationMode: {
        mousemove () {
            return {};
        }
    }
}




// function draw() {
//     if (!display.animating) return;
//     clear();
//     renderer.drawGrid(ctx, display)
//     agents.forEach(s => {
//         s.update();
//         s.draw(ctx);
//     });
//     animationId = requestAnimationFrame(draw); // save the ID here too
// }