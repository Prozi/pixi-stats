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
            console.error('[PIXI Hooks] missing Renderer');
            return;
        }
        if (renderer.gl) {
            this.attach(renderer.gl);
            const texture = renderer.texture;
            // pixi v6 compatibility
            const glTextures = texture._glTextures || texture.managedTextures;
            // pixi v6 compatibility
            const glTexturesArray = Array.isArray(glTextures)
                ? glTextures
                : Object.values(glTextures);
            if (!glTexturesArray || !this.texturehook) {
                console.error('[PIXI Stats] !glTextures || !this.texturehook');
            }
            else {
                console.log('[PIXI Hooks] Collect used textures:', glTexturesArray.length);
                glTexturesArray.forEach((glTexture) => {
                    if (glTexture.gl === renderer.gl && glTexture.texture) {
                        this.texturehook.registerTexture(glTexture.texture);
                    }
                });
            }
        }
        else {
            console.warn('[PIXI Stats] gl in renderer not hooked');
        }
    }
}
exports.PIXIHooks = PIXIHooks;
//# sourceMappingURL=pixi-hooks.js.map