"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panel = void 0;
const stats_constants_1 = require("./stats-constants");
class Panel {
    constructor(name, fg, bg) {
        this.values = [];
        this.snapshotSize = 30; // min~max of X frames total
        const canvas = document.createElement('canvas');
        canvas.width = stats_constants_1.WIDTH;
        canvas.height = stats_constants_1.HEIGHT;
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Cant get context on canvas');
        }
        context.font = `bold ${stats_constants_1.FONT_SIZE}px ${getComputedStyle(document.body).fontFamily}`;
        context.textBaseline = 'top';
        context.fillStyle = bg;
        context.fillRect(0, 0, stats_constants_1.WIDTH, stats_constants_1.HEIGHT);
        context.fillStyle = fg;
        context.fillText(name, stats_constants_1.TEXT_X, stats_constants_1.TEXT_Y);
        context.fillRect(stats_constants_1.GRAPH_X, stats_constants_1.GRAPH_Y, stats_constants_1.GRAPH_WIDTH, stats_constants_1.GRAPH_HEIGHT);
        context.fillStyle = bg;
        context.globalAlpha = 0.8;
        context.fillRect(stats_constants_1.GRAPH_X, stats_constants_1.GRAPH_Y, stats_constants_1.GRAPH_WIDTH, stats_constants_1.GRAPH_HEIGHT);
        this.name = name;
        this.dom = canvas;
        this.context = context;
        this.fg = fg;
        this.bg = bg;
    }
    get min() {
        return this.values
            .reduce((min, value) => Math.min(min, value), Infinity)
            .toFixed();
    }
    get max() {
        return this.values.reduce((max, value) => Math.max(max, value), 0).toFixed();
    }
    get averageValue() {
        return (this.values.reduce((sum, value) => sum + value, 0) / this.values.length).toFixed(1);
    }
    pushValue(value) {
        this.values.push(value);
        if (this.values.length > this.snapshotSize) {
            this.values = this.values.slice(-this.snapshotSize);
        }
    }
    update(value, maxValue) {
        const context = this.context;
        this.pushValue(value);
        context.fillStyle = this.bg;
        context.globalAlpha = 1;
        context.fillRect(0, 0, stats_constants_1.WIDTH, stats_constants_1.GRAPH_Y);
        context.fillStyle = this.fg;
        context.font = `bold ${stats_constants_1.FONT_SIZE}px ${getComputedStyle(document.body).fontFamily}`;
        context.fillText(`${this.averageValue} ${this.name} (${this.min}-${this.max})`, stats_constants_1.TEXT_X, stats_constants_1.TEXT_Y);
        context.drawImage(this.dom, stats_constants_1.GRAPH_X + stats_constants_1.PR, stats_constants_1.GRAPH_Y, stats_constants_1.GRAPH_WIDTH - stats_constants_1.PR, stats_constants_1.GRAPH_HEIGHT, stats_constants_1.GRAPH_X, stats_constants_1.GRAPH_Y, stats_constants_1.GRAPH_WIDTH - stats_constants_1.PR, stats_constants_1.GRAPH_HEIGHT);
        context.fillRect(stats_constants_1.GRAPH_X + stats_constants_1.GRAPH_WIDTH - stats_constants_1.PR, stats_constants_1.GRAPH_Y, stats_constants_1.PR, stats_constants_1.GRAPH_HEIGHT);
        context.fillStyle = this.bg;
        context.globalAlpha = 0.8;
        context.fillRect(stats_constants_1.GRAPH_X + stats_constants_1.GRAPH_WIDTH - stats_constants_1.PR, stats_constants_1.GRAPH_Y, 2 * stats_constants_1.PR, Math.round((1 - value / maxValue) * stats_constants_1.GRAPH_HEIGHT));
    }
}
exports.Panel = Panel;
//# sourceMappingURL=stats-panel.js.map