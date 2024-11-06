import { Texture, WebGLRenderer } from 'pixi.js';
import BaseHooks from './hooks/BaseHooks';
import { Panel } from './stats-panel';
import { Stats } from './stats';
export { Texture, WebGLRenderer };
export type PIXIGlTextureSystem = {
    _glTextures: Record<string, {
        gl: WebGLRenderingContext;
        texture: Texture;
    }>;
};
export declare class StatsJSAdapter {
    hook: PIXIHooks;
    stats: Stats;
    dcPanel: Panel;
    tcPanel: Panel;
    constructor(hook: PIXIHooks, stats: Stats);
    update(): void;
    reset(): void;
}
export declare class PIXIHooks extends BaseHooks {
    constructor(renderer: WebGLRenderer);
}
//# sourceMappingURL=stats-gl.d.ts.map