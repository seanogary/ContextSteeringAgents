import { psi_default, g_default } from "../constants.js";
import { display } from "../world/display.js";
import { world } from "../world/world.js";
import { DDA } from "../core/dda.js";
import { renderer } from "../simulation/renderer.js";
import { lerpAngle } from "../core/core.js";

export class SteeringAgent {
    constructor(x = 500, y = 500, size = 10, color = 'rgb(200,0,0)', numReceptors = 8) {
        this.agentId = Math.random().toString(36).substring(2, 15);
        this.pos = { x, y };
        this.vel = { x: 1, y: 0 };
        this.width = size;
        this.height = size;
        this.color = color;
        this.numReceptors = numReceptors;
        this.receptors = [...Array(numReceptors).keys()].map(el => ({
            angle: el * (2*Math.PI / numReceptors), // angle relative to agent
            angularSensitivity: psi_default, // angular sensitivity
            radialSensitivity: g_default // radial sensitivity
        }))
        this.dangerMap = Array(numReceptors).fill(0);
        this.interestMap = Array(numReceptors).fill(0);
    }

    update() {
        this.updateContext();
        const minValue = Math.min(...this.dangerMap);
        const receptorDir = this.receptors[this.dangerMap.indexOf(minValue)].angle + Math.atan2(this.vel.y, this.vel.x);
        const angle = lerpAngle(Math.atan2(this.vel.y, this.vel.x), receptorDir, 0.2);
        this.vel = {x: Math.cos(angle), y: Math.sin(angle)};

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        if (this.pos.x > display.width()) this.pos.x = -this.width;
        if (this.pos.y > display.height()) this.pos.y = -this.height;
        if (this.pos.x + this.width < 0) this.pos.x = display.width();
        if (this.pos.y + this.height < 0) this.pos.y = display.height();
    }

    updateContext() {
        const agentAngle = Math.atan2(this.vel.y, this.vel.x);
        const rayLength = 500;
        renderer.overlaidGeometry.agentRays[this.agentId] = [];
        // use ray casting to detect objects
        this.receptors.forEach((receptor, index) => {
            const totalAngle = agentAngle + receptor.angle;
            const lineEnd = {
                x: this.pos.x + rayLength * Math.cos(totalAngle),
                y: this.pos.y + rayLength * Math.sin(totalAngle)
            };

            let rayInfo = DDA.castRay(this.pos, lineEnd, display, world);
            renderer.overlaidGeometry.agentRays[this.agentId].push(rayInfo.cells);

            // calculate context values
            let z = g_default(rayInfo.distance);
            console.log(z);
            this.dangerMap[index] = z;
        })
        console.log(this.dangerMap);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(Math.atan2(this.vel.y, this.vel.x));
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}
