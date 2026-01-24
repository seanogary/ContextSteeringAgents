import { display, ctx } from '../world/display.js';
import { world } from '../world/world.js';
import { geometry } from '../core/geometry.js';
import { deepEqual } from '../core/core.js';
import { renderer } from '../simulation/renderer.js';

export const DDAVisualizationMode = {
    lineStart: null,
    lineEnd: null,
    mouseDown: false,

    mouseup() {
        this.mouseDown = false;
        this.lineStart = null;
        this.lineEnd = null;
        delete renderer.overlaidGeometry.line;
        display.clear();
        renderer.drawGrid(ctx, display);
    },

    mousedown(x,y) {
        this.mouseDown = true;
        this.lineStart = {x: x, y: y};
        this.lineEnd = {x: x, y: y};
    },

    mousemove(x,y) {
        this.lineEnd = {x: x, y: y};
        if (this.mouseDown) {
            renderer.overlaidGeometry.line = {
                start: this.lineStart,
                end: this.lineEnd,
            }
            display.clear();
            renderer.drawGrid(ctx, display);
        }
    }
}