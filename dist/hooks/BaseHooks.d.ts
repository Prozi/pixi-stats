import GLHook from './GLHook';
import TextureHook from './TextureHook';
export default class BaseHooks {
    protected _drawCalls: number;
    protected _maxDeltaDrawCalls: number;
    protected glhook?: GLHook;
    protected texturehook?: TextureHook;
    constructor();
    attach(gl: any): void;
    get drawCalls(): number;
    get maxDeltaDrawCalls(): number;
    get deltaDrawCalls(): number;
    get maxTextureCount(): number;
    get texturesCount(): number;
    reset(): void;
    release(): void;
}
//# sourceMappingURL=BaseHooks.d.ts.map