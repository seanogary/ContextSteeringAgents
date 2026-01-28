import { psi_default, g_default } from "../constants.js";
import { display } from "../world/display.js";
import { world } from "../world/world.js";
import { DDA } from "../core/dda.js";
import { renderer } from "../simulation/renderer.js";
import { lerpAngle, lerp } from "../core/core.js";
import { arraySubtract } from "../core/core.js";

const default_config = {
    danger: true,
    interest: false,
    g: {
        maxRange: 5,
    }
}

const default_vel = {x: 1, y: 0};

export class SteeringAgent {
    constructor(
        x = 500, 
        y = 500,
        vel = default_vel,
        size = 10, 
        color = 'rgb(200,0,0)', 
        numReceptors = 8, 
        config = default_config
    ){
        this.agentId = Math.random().toString(36).substring(2, 15);
        this.pos = { x, y };
        this.vel = vel;
        this.angle = Math.atan2(vel.y, vel.x);
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
        this.config = config;
    }

    update() {
        this.updateContext();
        this.updateVelocity();
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        if (this.pos.x > display.width()) this.pos.x = -this.width;
        if (this.pos.y > display.height()) this.pos.y = -this.height;
        if (this.pos.x + this.width < 0) this.pos.x = display.width();
        if (this.pos.y + this.height < 0) this.pos.y = display.height();
    }

    updateVelocity() {
        const smoothingFactor = 0.1;
        const { angle, speed } = this.calculateSteeringVector();
        if (speed == 0) speed = 1;
        console.log(speed);
        const new_angle = lerpAngle(Math.atan2(this.vel.y, this.vel.x), angle, smoothingFactor);
        const new_velocity = lerp(this.vel.x**2 + this.vel.y**2, speed, 0.01);
        console.log(`new_velocity: ${new_velocity}`);
        this.vel = {x: new_velocity*Math.cos(new_angle), y: new_velocity*Math.sin(new_angle)};
        this.angle = Math.atan2(this.vel.y, this.vel.x);

    }

    calculateSteeringVector() {
        if (this.config.interest) {
            const combinedMap = arraySubtract(this.interestMap, this.dangerMap);
            const maxValue = Math.max(...combinedMap);
            if (maxValue > 0) 
                return {
            angle: this.receptors[this.combinedMap.indexOf(maxValue)].angle + this.angle,
            speed: this.config.interest[this.combinedMap.indexOf(maxValue)],
            }
        }

        const minValue = Math.min(...this.dangerMap);
        let speed = 1*this.dangerMap[this.dangerMap.indexOf(minValue)]
        speed = 10;
        console.log(`speed: ${speed <= 0.2}`)
        return {
            angle: this.receptors[this.dangerMap.indexOf(minValue)].angle + this.angle,
            speed: speed,
        }
    }

    updateContext() {
        const rayLength = 500;
        renderer.overlaidGeometry.agentRays[this.agentId] = [];
        // use ray casting to detect objects
        this.receptors.forEach((receptor, index) => {
            const totalAngle = this.angle + receptor.angle;
            const lineEnd = {
                x: this.pos.x + rayLength * Math.cos(totalAngle),
                y: this.pos.y + rayLength * Math.sin(totalAngle)
            };

            let rayInfo = DDA.castRay(this.pos, lineEnd, display, world);
            renderer.overlaidGeometry.agentRays[this.agentId].push(rayInfo.cells);

            // calculate context values
            let z = g_default(rayInfo.distance);
            this.dangerMap[index] = z;
        })
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
