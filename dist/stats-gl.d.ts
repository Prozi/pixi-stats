import BaseHooks from './hooks/BaseHooks';
import { Renderer, IStats, Texture } from './model';
import { Panel } from './stats-panel';
export interface PIXIGlTexture {
    gl: WebGLRenderingContext;
    texture: Texture;
}
export type PIXIGlTextureArray = PIXIGlTexture[];
export type PIXIGlTextureRecord = Record<string, PIXIGlTexture>;
export interface PIXIRendererGlTexture {
    managedTextures?: PIXIGlTextureArray;
    _glTextures?: PIXIGlTextureRecord;
}
export declare class StatsJSAdapter {
    hook: PIXIHooks;
    stats: IStats;
    dcPanel: Panel;
    tcPanel: Panel;
    constructor(hook: PIXIHooks, stats: IStats);
    update(): void;
    reset(): void;
}
export declare class PIXIHooks extends BaseHooks {
    constructor(renderer: Renderer);
}
//# sourceMappingURL=stats-gl.d.ts.map