export default class TextureHook {
    createdTextures: Array<any>;
    maxTexturesCount: number;
    isInit: boolean;
    private realGLCreateTexture;
    private realGLDeleteTexture;
    private gl;
    constructor(_gl?: any);
    get currentTextureCount(): number;
    registerTexture(texture: any): void;
    private fakeGLCreateTexture;
    private fakeGLDeleteTexture;
    reset(): void;
    release(): void;
}
//# sourceMappingURL=TextureHook.d.ts.map