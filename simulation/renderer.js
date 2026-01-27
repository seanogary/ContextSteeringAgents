export const renderer = {

    overlaidGeometry: {
        agentRays: {},
    },

    drawLine(ctx, start, end) {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    },

    plotPoint(point, ctx, color) {
        ctx.fillStyle = color;
        ctx.fillRect(point.x - 4, point.y - 4, 8, 8);
    },

    drawGrid(ctx, display) {
        // display.resizeCanvas();
        const {canvasHeight, canvasWidth, resolution} = display;
        const tilingDimensions = display.getTilingDimensions(
            canvasHeight,
            canvasWidth,
            resolution
        );
        // calculate tile size
        const tileSize = (canvasHeight / tilingDimensions[0]);
        // draw vertical lines (iterate over X positions stored in grid[1])
        for (let i = 0; i < tilingDimensions[1]; i++) {
            this.drawLine(
                ctx, 
                {x: tileSize * i, y: 0}, 
                {x: tileSize * i, y: canvasHeight}
            );
        }

        // draw horizontal lines (iterate over Y positions stored in grid[0])
        for (let i = 0; i < tilingDimensions[0]; i++) {
            this.drawLine(
                ctx,
                {x: 0, y: tileSize * i },
                {x: canvasWidth, y: tileSize * i }
            );
        }
    },

    drawOverlaidGeometry(ctx, display) {
        if (this.overlaidGeometry.cellGroup) {
            this.renderCellGroup(this.overlaidGeometry.cellGroup, ctx, display);
        }

        if (this.overlaidGeometry.verticalIntersections) {
            this.overlaidGeometry.verticalIntersections.forEach((point) => {
                this.plotPoint(point, ctx, "red");
            })
        }

        if (this.overlaidGeometry.horizontalIntersections) {
            this.overlaidGeometry.horizontalIntersections.forEach((point) => {
                this.plotPoint(point, ctx, "blue")
            })
        }
        
        if (this.overlaidGeometry.line) {
            this.drawLine(ctx, this.overlaidGeometry.line.start, this.overlaidGeometry.line.end);
        }

        if (this.overlaidGeometry.agentRays) {
            Object.entries(this.overlaidGeometry.agentRays).forEach(([key, rays]) => {
                rays.forEach(cellGroup => {
                    this.renderCellGroup(cellGroup, ctx, display);
                });
            });
        }

    },

    renderCellGroup(cellGroup, ctx, display) {
        cellGroup.forEach((cell) => {
            this.colorCell(ctx, display, cell, "rgba(200,200,200,0.8)");
        })
    },

    colorCell(ctx, display, cell, color="red") {
        const { tileSize } = display;
        const [ col, row ] = cell;
        ctx.fillStyle = color;
        ctx.fillRect(
            tileSize * row,
            tileSize * col,
            tileSize,
            tileSize
        );
        ctx.fill();
    },

    clearCell(ctx, display, cell) {
        const { tileSize } = display;
        const [ col, row ] = cell;
        ctx.clearRect(
            tileSize * row,
            tileSize * col,
            tileSize,
            tileSize
        );
    },

    renderWorld(ctx, display, world) {
        world.material.forEach((row, rowI) => {
            row.forEach((el, colI) => {
                const cell = [rowI, colI];
                if (el == 1) {
                    this.colorCell(ctx, display, cell)
                } else if (el == 0){
                    this.clearCell(ctx, display, cell);
                };
            })
        });
        this.drawOverlaidGeometry(ctx, display);
        this.drawAgents(ctx, world);
    },

    drawMaterial(ctx, display, world) {
        world.material.forEach((row, rowI) => {
            row.forEach((cell, colI) => {
                this.colorCell(ctx, display, [colI, rowI]);
            })
        })
    },

    drawAgents(ctx, world) {
        if (world.agents) {
            world.agents.forEach((agent) => {
                agent.draw(ctx);
            })
        }
    },
}