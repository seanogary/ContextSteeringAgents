import { display } from '../world/display.js';
import { world } from '../world/world.js';
import { geometry } from '../core/geometry.js';
import { deepEqual } from '../core/core.js';

export const MaterialPaintMode = {
  currentCell: null,
  currentCellVal: null,
  currentMousePosition: null,
  mouseTravelDistance: 0,
  drawing: false,
  mouseDown: false,
  isPainted: null,

  isEnteringNewCell(x, y) {
    return !deepEqual(this.currentCell, display.getCellFromCoords(x, y));
  },

  colorCell() {
    world.updateCellState(this.currentCell, this.drawing ? 'draw' : null);
  },

  mousemove(x, y) {
    if (this.isEnteringNewCell(x, y)) {
      this.currentCell = display.getCellFromCoords(x, y);
      this.currentCellVal = world.getCellState(this.currentCell.x, this.currentCell.y);
    }

    if (this.drawing && !this.currentCellVal) {
      this.colorCell();
    }

    if (this.currentMousePosition && this.mouseDown) {
      this.mouseTravelDistance += geometry.distance(
        this.currentMousePosition,
        [x, y]
      );
    }

    if (this.mouseTravelDistance > display.canvasHeight / display.tileDimensions[0]) {
      this.drawing = true;
    }

    this.currentMousePosition = [x, y];

    return {
      currentCell: this.currentCell,
      currentCellVal: this.currentCellVal,
      mouseTravelDistance: this.mouseTravelDistance,
      drawing: this.drawing,
      currentMousePosition: this.currentMousePosition,
    };
  },

  mousedown(x, y) {
    this.mouseDown = true;
    if (!this.currentCellVal) {
      this.colorCell();
      this.isPainted = true;
    } else {
      this.isPainted = false;
    }
  },

  mouseup() {
    if (this.currentCellVal && !this.drawing && !this.isPainted) {
      this.colorCell();
    }
    this.currentMousePosition = null;
    this.mouseTravelDistance = 0;
    this.drawing = false;
    this.mouseDown = false;
  },
};
