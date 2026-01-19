import { display } from "../world/display.js";

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
        console.log("TYPE:")
        console.log(typeof display.getTilingDimensions)
        console.log("TYPE ^^^")
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
        ctx.fillRect(
            tileSize * row,
            tileSize * col,
            tileSize,
            tileSize
        );
        ctx.fillStyle = 'red';
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
}