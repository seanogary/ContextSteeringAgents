import { display, resizeCanvas, ctx } from '../world/display.js'
import { world } from '../world/world.js'
import { renderer } from './renderer.js';

function update() {
    world.init(...display.tileDimensions);
}


let animating = false;
let animationId;
function toggleSimulation() {
    update();
    resizeCanvas();
    renderer.drawGrid(ctx, display);
    if (animating) {
        initializeState();
        animationId = requestAnimationFrame(draw);
    } else if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

// event listeners
window.addEventListener('load', () => {
    display.init();
    world.init(...display.tileDimensions);
    toggleSimulation()

});

document.getElementById("res-up").addEventListener("click", (e) => {
    display.update(display.resolution + 1)
    // renderer.drawGrid(ctx, display)
    toggleSimulation();
})

document.getElementById("res-down").addEventListener("click", (e) => {
    display.update(display.resolution <= 1 ? 1 : display.resolution - 1);
    toggleSimulation();
})

document.getElementById("play-button").addEventListener("click", () => {
    animating = true;
    document.getElementById("sim-state").innerText = "Running";
    toggleSimulation();
})

document.getElementById("pause-button").addEventListener("click", () => {
    animating = false;
    document.getElementById("sim-state").innerText = "Not Running";
    toggleSimulation();
})

let mouseX = 0;
let mouseY = 0;
let drawing = false;

document.getElementById("canvas").addEventListener("mousemove", (e) => {
    let canvas = document.getElementById("canvas");
    mouseX = e.clientX - canvas.getBoundingClientRect().left;
    mouseY = e.clientY - canvas.getBoundingClientRect().top;
    display.currentCell = display.getCellFromCoords(mouseX, mouseY);
    if (drawing) {
       display.handleDraw();
    }
});

document.getElementById("canvas").addEventListener("click", () => {
    world.updateCellState(display.currentCell);
    console.log(world.material);
});

let drawTimeout;
document.getElementById("canvas").addEventListener("mousedown", (e) => {
    drawTimeout = setTimeout(() => {
        drawing = true;
        world.updateCellState(display.currentCell, 'draw');
    }, 150)
});

document.getElementById("canvas").addEventListener("mouseup", (e) => {
    if (drawing) world.updateCellState(display.currentCell);
    clearTimeout(drawTimeout);
    drawing = false;
});