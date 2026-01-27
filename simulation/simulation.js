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
        // this.print();
    },

    print() {
        console.log(new Date());
        console.log(`${this.numFrames}\r`);
    },

    start() {
        console.log("SIMULATION STARTED");
        console.clear();
        this.numFrames = 0;
        renderer.overlaidGeometry.cellGroup = [];
    },

    stop() {
        console.log("SIMULATION STOPPED");
    }, 
}