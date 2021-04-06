import { PIXIHooks, StatsJSAdapter } from './stats-gl';
import { Panel } from './stats-panel';
export class Stats {
    constructor() {
        this.setMode = this.showPanel;
        this.mode = 0;
        this.domElement = document.createElement('div');
        this.domElement.id = 'stats';
        this.domElement.addEventListener('click', (event) => {
            event.preventDefault();
            this.showPanel(++this.mode % this.domElement.children.length);
        }, false);
        this.beginTime = (performance || Date).now();
        this.prevTime = this.beginTime;
        this.frames = 0;
        this.fpsPanel = this.addPanel(new Stats.Panel('FPS', '#3ff', '#002'));
        this.msPanel = this.addPanel(new Stats.Panel('MS', '#0f0', '#020'));
        if (performance && performance.memory) {
            this.memPanel = this.addPanel(new Stats.Panel('MB', '#f08', '#200'));
        }
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
            if (this.memPanel) {
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
Stats.Panel = Panel;
export function addStats(document, app) {
    const stats = new Stats();
    const pixiHooks = new PIXIHooks(app);
    const adapter = new StatsJSAdapter(pixiHooks, stats);
    document.body.appendChild(adapter.stats.domElement);
    return adapter;
}
