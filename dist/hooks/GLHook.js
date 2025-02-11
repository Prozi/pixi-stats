"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
class GLHook {
    constructor(_gl) {
        this.drawPasses = 0;
        this.isInit = false;
        this.realGLDrawElements = function () { };
        if (!_gl) {
            console.warn("[GLHook] GL can't be NULL");
        }
        else if (_gl.__proto__.drawElements) {
            this.gl = _gl;
            this.realGLDrawElements = this.gl.__proto__.drawElements;
            // replace with new function
            this.gl.__proto__.drawElements = this.fakeGLdrawElements.bind(this);
            this.isInit = true;
            console.info('[GLHook] GL was Hooked!');
        }
    }
    fakeGLdrawElements(mode, count, type, offset) {
        this.drawPasses++;
        this.realGLDrawElements.call(this.gl, mode, count, type, offset);
    }
    reset() {
        this.drawPasses = 0;
    }
    release() {
        if (this.isInit) {
            this.gl.__proto__.drawElements = this.realGLDrawElements;
            console.info('[GLHook] Hook was removed!');
        }
        this.isInit = false;
    }
}
exports.default = GLHook;
//# sourceMappingURL=GLHook.js.map