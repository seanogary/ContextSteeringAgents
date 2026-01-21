export const renderer = {
    drawLine(ctx, start, end) {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    },

    plotPoint(point, ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(point.x -5, point.y - 5, 10, 10);
    },

    drawGrid(ctx, display) {
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

    colorCell(ctx, display, cell) {
        const { tileSize } = display;
        const [ col, row ] = cell;
        ctx.fillStyle = 'red';
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
    },

    drawMaterial(ctx, display, world) {



        world.material.forEach((row, rowI) => {
            row.forEach((cell, colI) => {
                this.colorCell(ctx, display, [colI, rowI]);
            })
        })
    },

    drawAgents(ctx, world) {
        // console.log("Agents drawn");
    },
}