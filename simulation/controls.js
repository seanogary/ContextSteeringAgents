import { display, ctx } from '../world/display.js';
import { world } from '../world/world.js';
import { renderer } from './renderer.js';
import { simulation } from './simulation.js'
import { MaterialPaintMode } from '../modes/MaterialPaintMode.js';
import { DDAVisualizationMode } from '../modes/DDAMode.js'
import { RayCastingMode } from '../modes/RayCastingMode.js';
export const controls = {
    animating: false,
    animationId: null,
    activeMode: null,

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
        modes[this.activeMode]?.mousemove?.(x, y);
    },

    registerMousedown(x,y) {
        modes[this.activeMode]?.mousedown?.(x,y);
    },

    registerMouseup(x,y) {
        modes[this.activeMode]?.mouseup?.(x,y);
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
        console.log(mode);
        this.activeMode = modeMap[mode];
        console.log(this.activeMode);
    },

}

const modes = {
    DDAVisualizationMode: DDAVisualizationMode, 
    RayCastingMode: RayCastingMode,
    ContextSteeringMode: MaterialPaintMode,
}

const modeMap = {
    "DDA-viz": "DDAVisualizationMode",
    "ray-casting": "RayCastingMode",
    "context-steering-agents": "ContextSteeringMode",
}