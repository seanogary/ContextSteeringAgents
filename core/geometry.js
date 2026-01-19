
export const geometry = {
    plotPoint(point, ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(point.x -5, point.y - 5, 10, 10);
    },
    drawLine(initialPoint, vec, ctx) {
        ctx.beginPath();
        ctx.moveTo(initialPoint.x, initialPoint.y);
        let scale = 1000;
        let toPoint = {
            x: initialPoint.x + scale*vec.x, 
            y: initialPoint.y + scale*vec.y
        }
        ctx.lineTo(toPoint.x, toPoint.y);
        ctx.stroke();
    }
}