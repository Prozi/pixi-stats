import { type Texture, type WebGLRenderer } from 'pixi.js';
import BaseHooks from './hooks/BaseHooks';
import { Panel } from './stats-panel';
import { Stats } from './stats';
export { type Texture, type WebGLRenderer };
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