"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PIXIHooks = exports.StatsJSAdapter = void 0;
const BaseHooks_1 = __importDefault(require("@pietal.dev/gstats/dist/BaseHooks"));
const stats_panel_1 = require("./stats-panel");
class StatsJSAdapter {
    constructor(hook, stats) {
        this.hook = hook;
        this.stats = stats;
        if (this.stats) {
            this.dcPanel = this.stats.addPanel(new stats_panel_1.Panel('DC', '#f60', '#300'));
            this.tcPanel = this.stats.addPanel(new stats_panel_1.Panel('TC', '#0c6', '#033'));
        }
        else {
            throw new Error("Stats can't found in window, pass instance of Stats.js as second param");
        }
    }
    update() {
        if (this.stats) {
            if (this.hook) {
                this.dcPanel.update(this.hook.deltaDrawCalls, Math.max(50, this.hook.maxDeltaDrawCalls));
                this.tcPanel.update(this.hook.texturesCount, Math.max(20, this.hook.maxTextureCount));
            }
            this.stats.update();
        }
    }
    reset() {
        if (this.hook) {
            this.hook.reset();
        }
    }
}
exports.StatsJSAdapter = StatsJSAdapter;
class PIXIHooks extends BaseHooks_1.default {
    constructor(renderer) {
        super();
        if (!renderer) {
            console.error('[PIXI Hooks] missing PIXI.WebGLRenderer');
            return;
        }
        if (renderer.gl) {
            this.attach(renderer.gl);
            const { _glTextures: glTextures } = renderer.texture;
            if (!glTextures || !this.texturehook) {
                console.error('[PIXI Hooks] !glTextures || !this.texturehook');
            }
            else {
                console.log('[PIXI Hooks] Collect used textures:', glTextures.length);
                Object.values(glTextures).forEach((glTexture) => {
                    if (glTexture.gl === renderer.gl && glTexture.texture) {
                        this.texturehook.registerTexture(glTexture.texture);
                    }
                });
            }
        }
        else {
            console.error('[PIXI Hook] Canvas renderer is not allowed');
        }
    }
}
exports.PIXIHooks = PIXIHooks;
//# sourceMappingURL=stats-gl.js.map