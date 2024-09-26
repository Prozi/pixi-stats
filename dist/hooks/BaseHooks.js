"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GLHook_1 = __importDefault(require("./GLHook"));
const TextureHook_1 = __importDefault(require("./TextureHook"));
class BaseHooks {
    constructor() {
        this._drawCalls = -1;
        this._maxDeltaDrawCalls = -1;
    }
    attach(gl) {
        this.glhook = new GLHook_1.default(gl);
        this.texturehook = new TextureHook_1.default(gl);
    }
    get drawCalls() {
        if (this.glhook && this.glhook.isInit) {
            return this.glhook.drawPasses;
        }
        return -1;
    }
    get maxDeltaDrawCalls() {
        return this._maxDeltaDrawCalls;
    }
    get deltaDrawCalls() {
        if (this._drawCalls == -1) {
            this._drawCalls = this.drawCalls;
            return 0;
        }
        const dc = this.drawCalls;
        const delta = dc - this._drawCalls;
        this._drawCalls = dc;
        this._maxDeltaDrawCalls = Math.max(this._maxDeltaDrawCalls, delta);
        return delta;
    }
    get maxTextureCount() {
        if (this.texturehook && this.texturehook.isInit)
            return this.texturehook.maxTexturesCount;
        return 0;
    }
    get texturesCount() {
        if (this.texturehook && this.texturehook.isInit)
            return this.texturehook.currentTextureCount;
        return 0;
    }
    reset() {
        this._maxDeltaDrawCalls = -1;
        this._drawCalls = -1;
        if (this.glhook)
            this.glhook.reset();
        if (this.texturehook)
            this.texturehook.reset();
    }
    release() {
        if (this.glhook)
            this.glhook.release();
        if (this.texturehook)
            this.texturehook.release();
    }
}
exports.default = BaseHooks;
//# sourceMappingURL=BaseHooks.js.map