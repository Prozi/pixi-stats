"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stats = void 0;
const stats_gl_1 = require("./stats-gl");
const stats_panel_1 = require("./stats-panel");
const pixi_js_1 = require("pixi.js");
class Stats {
    constructor(renderer, containerElement = document.body) {
        this.mode = 0;
        this.frames = 0;
        this.beginTime = (performance || Date).now();
        this.prevTime = this.beginTime;
        this.domElement = document.createElement('div');
        this.domElement.id = 'stats';
        this.domElement.addEventListener('click', (event) => {
            event.preventDefault();
            this.showPanel(++this.mode % this.domElement.children.length);
        }, false);
        this.fpsPanel = this.addPanel(new stats_panel_1.Panel('FPS', '#3ff', '#002'));
        this.msPanel = this.addPanel(new stats_panel_1.Panel('MS', '#0f0', '#020'));
        if ('memory' in performance) {
            this.memPanel = this.addPanel(new stats_panel_1.Panel('MB', '#f08', '#200'));
        }
        this.pixiHooks = new stats_gl_1.PIXIHooks(renderer);
        this.adapter = new stats_gl_1.StatsJSAdapter(this.pixiHooks, this);
        this.showPanel(0);
        containerElement.appendChild(this.domElement);
        const ticker = pixi_js_1.Ticker.shared || new pixi_js_1.Ticker();
        ticker.add(this.adapter.update, this.adapter, pixi_js_1.UPDATE_PRIORITY.UTILITY);
    }
    addPanel(panel) {
        this.domElement.appendChild(panel.dom);
        return panel;
    }
    showPanel(id) {
        for (let index = 0; index < this.domElement.children.length; index++) {
            const element = this.domElement.children[index];
            element.style.display = index === id ? 'block' : 'none';
        }
        this.mode = id;
    }
    begin() {
        this.beginTime = (performance || Date).now();
    }
    end() {
        this.frames++;
        const time = (performance || Date).now();
        this.msPanel.update(time - this.beginTime, 200);
        if (time > this.prevTime + 1000) {
            this.fpsPanel.update((this.frames * 1000) / (time - this.prevTime), 100);
            this.prevTime = time;
            this.frames = 0;
            if (this.memPanel && 'memory' in performance) {
                const memory = performance.memory;
                this.memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
            }
        }
        return time;
    }
    update() {
        this.beginTime = this.end();
    }
}
exports.Stats = Stats;
//# sourceMappingURL=stats.js.map