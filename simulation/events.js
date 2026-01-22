import { controls } from './controls.js';

// event listeners
window.addEventListener('load', () => {
    controls.init();
});

document.getElementById("res-up").addEventListener("click", (e) => {
    controls.updateResolution(1, 'inc');
})

document.getElementById("res-down").addEventListener("click", (e) => {
    controls.updateResolution(1, 'dec');
})

document.getElementById("play-button").addEventListener("click", () => {
    controls.startSimulation();
    document.getElementById("sim-state").innerText = "Running";
})

document.getElementById("pause-button").addEventListener("click", () => {
    controls.stopSimulation();
    document.getElementById("sim-state").innerText = "Not Running";
})

let mouseX = 0;
let mouseY = 0;
document.getElementById("canvas").addEventListener("mousemove", (e) => {
    let canvas = document.getElementById("canvas");
    mouseX = e.clientX - canvas.getBoundingClientRect().left;
    mouseY = e.clientY - canvas.getBoundingClientRect().top;
    controls.registerMousemove(mouseX, mouseY);
});

document.getElementById("canvas").addEventListener("mousedown", () => {
    controls.registerMousedown();
});

document.getElementById("canvas").addEventListener("mouseup", (e) => {
    controls.registerMouseup();
});


// mode selection
const form = document.getElementById("mode-selector");
form.addEventListener("change", (e) => {
    controls.registerModeSelection(e.target.id);
})