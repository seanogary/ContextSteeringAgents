class SteeringAgent {
    constructor(x = 50, y = 50, size = 40, color = 'rgb(200,0,0)', numReceptors = 8) {
        this.pos = { x, y };
        this.vel = { x: 1, y: 0.5 };
        this.width = size;
        this.height = size;
        this.color = color;
        this.numReceptors = numReceptors;
        this.receptors = [...Array(numReceptors).keys()].map(el => {
            el * (2*Math.PI / numReceptors), // angle relative to agent
            psi_default, // angular sensitivity
            g_default // radial sensitivity
        })
        this.dangerMap = Array(numReceptors).fill(0);
        this.interestMap = Array(numReceptors).fill(0);
    }

    // Minimal update: move by velocity and wrap around edges
    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        if (this.pos.x > display.width()) this.pos.x = -this.width;
        if (this.pos.y > display.height()) this.pos.y = -this.height;
        if (this.pos.x + this.width < 0) this.pos.x = display.width();
        if (this.pos.y + this.height < 0) this.pos.y = display.height();
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}

