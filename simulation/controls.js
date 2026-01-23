import { display, ctx } from '../world/display.js';
import { world } from '../world/world.js';
import { renderer } from './renderer.js';
import { simulation } from './simulation.js'
import { DDAVisualizationMode } from '../modes/DDAMode.js';

export const controls = {
    animating: false,
    animationId: null,
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

    registerMousemove(x, y) {
        modes[this.activeMode].mousemove?.(x, y);
    },

    registerMousedown() {
        modes[this.activeMode].mousedown?.();
    },

    registerMouseup() {
        modes[this.activeMode].mouseup?.();
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
        display.resizeCanvas(); 
        renderer.drawGrid(ctx, display);
    },

    registerModeSelection(mode) {
        console.log(mode)
    },
}


const modes = {
    DDAVisualizationMode: DDAVisualizationMode, 
}
