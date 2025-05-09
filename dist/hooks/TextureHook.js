"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
class TextureHook {
    constructor(_gl) {
        this.createdTextures = new Array();
        this.maxTexturesCount = 0;
        this.isInit = false;
        this.realGLCreateTexture = function () { };
        this.realGLDeleteTexture = function () { };
        if (!_gl) {
            console.warn("[TextureHook] GL can't be NULL");
        }
        else if (_gl.__proto__.createTexture) {
            this.gl = _gl;
            this.realGLCreateTexture = this.gl.__proto__.createTexture;
            this.realGLDeleteTexture = this.gl.__proto__.deleteTexture;
            // replace with new function
            this.gl.__proto__.createTexture = this.fakeGLCreateTexture.bind(this);
            this.gl.__proto__.deleteTexture = this.fakeGLDeleteTexture.bind(this);
            this.isInit = true;
            console.info('[TextureHook] GL was Hooked!');
        }
    }
    get currentTextureCount() {
        return this.createdTextures.length;
    }
    registerTexture(texture) {
        this.createdTextures.push(texture); // ++;
        this.maxTexturesCount = Math.max(this.createdTextures.length, this.maxTexturesCount);
    }
    fakeGLCreateTexture() {
        const texture = this.realGLCreateTexture.call(this.gl);
        this.registerTexture(texture);
        return texture;
    }
    fakeGLDeleteTexture(texture) {
        const index = this.createdTextures.indexOf(texture);
        if (index > -1) {
            this.createdTextures.splice(index, 1);
        }
        this.realGLDeleteTexture.call(this.gl, texture);
    }
    reset() {
        this.createdTextures = new Array();
        this.maxTexturesCount = 0;
    }
    release() {
        if (this.isInit) {
            this.gl.__proto__.createTexture = this.realGLCreateTexture;
            this.gl.__proto__.deleteTexture = this.realGLDeleteTexture;
            console.info('[TextureHook] Hook was removed!');
        }
        this.isInit = false;
    }
}
exports.default = TextureHook;
//# sourceMappingURL=TextureHook.js.map