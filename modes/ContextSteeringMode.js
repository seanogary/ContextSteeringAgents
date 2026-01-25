import { SteeringAgent } from "../agents/agent.js"
import { world } from "../world/world.js"
import { renderer } from "../simulation/renderer.js"
import { ctx } from "../world/display.js"
import { display } from "../world/display.js"
const agent = new SteeringAgent

export const ContextSteeringMode = {
    agents: [agent],

    mousedown(x, y) {
        world.agents.push(new SteeringAgent(x, y));
        console.log(world.agents);
        renderer.renderWorld(ctx, display, world);
        renderer.drawGrid(ctx, display);
    }
}
