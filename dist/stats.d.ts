import { PIXIHooks, StatsJSAdapter } from './stats-gl';
import { Panel } from './stats-panel';
import type { WebGLRenderer } from 'pixi.js';
export declare class Stats {
    static Panel: typeof Panel;
    mode: number;
    frames: number;
    beginTime: number;
    prevTime: number;
    domElement: HTMLDivElement;
    pixiHooks: PIXIHooks;
    adapter: StatsJSAdapter;
    fpsPanel: Panel;
    msPanel: Panel;
    memPanel?: Panel;
    setMode: (id: number) => void;
    constructor(document: Document, renderer: WebGLRenderer);
    addPanel(panel: Panel): Panel;
    showPanel(id: number): void;
    begin(): void;
    end(): number;
    update(): void;
}
//# sourceMappingURL=stats.d.ts.map