"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PIXIHooks = void 0;
const BaseHooks_1 = __importDefault(require("./hooks/BaseHooks"));
class PIXIHooks extends BaseHooks_1.default {
    get hooked() {
        return !!this.glhook;
    }
    constructor(renderer) {
        super();
        if (!renderer) {
            console.warn('[PIXI Hooks] renderer in constructor undefined');
            return;
        }
        if (!renderer.gl) {
            console.warn('[PIXI Hooks] gl in renderer not found');
            return;
        }
        this.attach(renderer.gl);
        if (!this.texturehook) {
            console.warn('[PIXI Hooks] attach hook to gl in renderer failed');
            return;
        }
        const texture = renderer.texture;
        // pixi v6 compatibility
        const glTextures = texture._glTextures || texture.managedTextures;
        // pixi v6 compatibility
        const glTexturesArray = Array.isArray(glTextures)
            ? glTextures
            : Object.values(glTextures);
        if (!glTexturesArray) {
            console.warn('[PIXI Hooks] no gl textures found');
            return;
        }
        console.info('[PIXI Hooks] Collect used textures:', glTexturesArray.length);
        glTexturesArray.forEach((glTexture) => {
            if (glTexture.gl === renderer.gl && glTexture.texture) {
                this.texturehook.registerTexture(glTexture.texture);
            }
        });
    }
}
exports.PIXIHooks = PIXIHooks;
//# sourceMappingURL=pixi-hooks.js.map