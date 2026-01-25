import { testHeight, testWidth } from '../constants.js';
import { gcd } from '../core/rational.js';
import { geometry } from '../core/geometry.js';
import { world } from './world.js'
import { deepEqual } from '../core/core.js';
import { renderer } from '../simulation/renderer.js';

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d')

let res = 1
export const display = {
    canvas: null, /// canvas.getContext('2d'),
    resolution: null,
    canvasWidth: null,
    canvasHeight: null,
    tileDimensions: null,
    currentCell: null,
    animating: false,
    animationId: null,
    init(ctx) {
        this.resolution = res;
        this.canvasHeight = testHeight;
        this.canvasWidth = testWidth;
        this.tileDimensions = this.getTilingDimensions(testHeight, testWidth, res);
        this.tileSize = this.canvasHeight / this.tileDimensions[0];
    },

    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        // Use a fixed, non-square CSS size to ensure predictable integer tilings.
        // Chosen to have many small divisors: 1536 x 1024 (3:2-ish rectangle).
        const cssWidth = testWidth; // CSS pixels // 1536
        const cssHeight = testHeight; // CSS pixels // 1024

        // Backing store size in device pixels
        canvas.width = Math.round(cssWidth * dpr);
        canvas.height = Math.round(cssHeight * dpr);

        // Ensure the style size matches CSS pixels so it doesn't visually scale
        canvas.style.width = cssWidth + 'px';
        canvas.style.height = cssHeight + 'px';

        // Reset transforms then scale to map drawing units to CSS pixels
        ctx.resetTransform && ctx.resetTransform();
        ctx.scale(dpr, dpr);
    },

    update(newResolution) {
        this.resolution = newResolution;
        this.tileDimensions = this.getTilingDimensions(testHeight, testWidth, newResolution);
        this.tileSize = this.canvasHeight / this.tileDimensions[0];
    },
    
    clear() {
        // Clear using the CSS pixel sizes so it matches what we draw to
        ctx.clearRect(0, 0, canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight);
    },

    // Back-compat helpers for older code expecting display.width() / display.height()
    width() {
        return this.canvasWidth;
    },

    height() {
        return this.canvasHeight;
    },

    getTilingDimensions(height, width, resolution) {
        let gcdValue = gcd(height, width);

        return [
            resolution*Math.floor(height / gcdValue), 
            resolution*Math.floor(width / gcdValue)
        ];
    },
    getCellFromCoords(X, Y) {
        const tileSize = this.canvasHeight / this.tileDimensions[0];
        return {
            x: Math.floor(X / tileSize),
            y: Math.floor(Y / tileSize)
        }
    },
    handleDraw() {
        if (!painted) {
            world.updateCellState(this.currentCell, 'draw');
            painted = true;
            prevCell = this.currentCell;
        }
        if (!deepEqual(this.currentCell, prevCell)){
            painted = false;
        }
    },

    // replace handle draw etc with handle specific states (mousedown, mouseup, etc)
    // these are events that take place on the canvas and must be handled by the display
    // layer (duh). At the moment state and handling (updates to display) are scattered
    // between display and control! NOT GOOD!

    handleMousedown() {},
    handleMouseup() {},

    increaseResolution(inc) {
        this.update(this.resolution + inc);
    },

    decreaseResolution(inc) {
        this.update(
            this.resolution - inc < 1 
            ? this.resolution 
            : this.resolution - inc
        );
    },

    toggleAnimation(val) {
        this.animating = val;
    },
}

let prevCell = {x: null, y: null};
let painted = false;

