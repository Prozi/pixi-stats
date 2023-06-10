import type { Application } from 'pixi.js';
import { StatsJSAdapter } from './stats-gl';
import { Panel } from './stats-panel';
export declare class Stats {
    static Panel: typeof Panel;
    mode: number;
    beginTime: number;
    prevTime: number;
    frames: number;
    domElement: HTMLDivElement;
    fpsPanel: Panel;
    msPanel: Panel;
    memPanel?: Panel;
    setMode: (id: number) => void;
    constructor();
    addPanel(panel: Panel): Panel;
    showPanel(id: number): void;
    begin(): void;
    end(): number;
    update(): void;
}
export declare function addStats(document: Document, app: Application): StatsJSAdapter;
//# sourceMappingURL=stats.d.ts.map