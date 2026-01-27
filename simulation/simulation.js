import { renderer } from "./renderer.js";

export const simulation = {
    numFrames: 0,
    renderFrame(ctx, display, world, renderer) {
        display.clear();
        world.agents.forEach(agent => {
            agent.update(); 
        });
        renderer.renderWorld(ctx, display,world);
        renderer.drawGrid(ctx, display);
        renderer.drawAgents(ctx, display ,world);
        this.numFrames += 1;
    },

    start() {
        this.numFrames = 0;
        renderer.overlaidGeometry.cellGroup = [];
    },

    stop() {
        // ???
    }, 
}