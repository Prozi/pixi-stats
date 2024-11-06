import { PIXIHooks, StatsJSAdapter, WebGLRenderer } from './stats-gl';
import { Panel } from './stats-panel';
export declare class Stats {
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
    constructor(renderer: WebGLRenderer, containerElement?: HTMLElement);
    addPanel(panel: Panel): Panel;
    showPanel(id: number): void;
    begin(): void;
    end(): number;
    update(): void;
}
//# sourceMappingURL=stats.d.ts.map