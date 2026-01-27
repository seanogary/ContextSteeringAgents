import { SteeringAgent } from "../agents/agent.js"
import { world } from "../world/world.js"
import { renderer } from "../simulation/renderer.js"
import { ctx } from "../world/display.js"
import { display } from "../world/display.js"

export const ContextSteeringMode = {

    mousedown(x, y) {
        const agent = new SteeringAgent(x, y);
        world.agents.push(agent);
        renderer.overlaidGeometry.agentRays[agent.agentId] = [];
        renderer.renderWorld(ctx, display, world);
        renderer.drawGrid(ctx, display);
    }
}
