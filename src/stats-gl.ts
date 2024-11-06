import { Texture, WebGLRenderer } from 'pixi.js';

import BaseHooks from './hooks/BaseHooks';
import { Panel } from './stats-panel';
import { Stats } from './stats';

export type PIXIGlTextureSystem = {
  _glTextures: Record<string, { gl: WebGLRenderingContext; texture: Texture }>;
};

export class StatsJSAdapter {
  hook: PIXIHooks;
  stats: Stats;

  dcPanel: Panel;
  tcPanel: Panel;

  constructor(hook: PIXIHooks, stats: Stats) {
    this.hook = hook;
    this.stats = stats;

    if (this.stats) {
      this.dcPanel = this.stats.addPanel(new Panel('DC', '#f60', '#300'));
      this.tcPanel = this.stats.addPanel(new Panel('TC', '#0c6', '#033'));
    } else {
      throw new Error(
        "Stats can't found in window, pass instance of Stats.js as second param"
      );
    }
  }

  update(): void {
    if (this.stats) {
      if (this.hook) {
        this.dcPanel.update(
          this.hook.deltaDrawCalls,
          Math.max(50, this.hook.maxDeltaDrawCalls)
        );
        this.tcPanel.update(
          this.hook.texturesCount,
          Math.max(20, this.hook.maxTextureCount)
        );
      }

      this.stats.update();
    }
  }

  reset(): void {
    if (this.hook) {
      this.hook.reset();
    }
  }
}

export class PIXIHooks extends BaseHooks {
  constructor(renderer: WebGLRenderer) {
    super();

    if (!renderer) {
      console.error('[PIXI Hooks] missing PIXI.WebGLRenderer');

      return;
    }

    if (renderer.gl) {
      this.attach(renderer.gl);

      const { _glTextures: glTextures } =
        renderer.texture as unknown as PIXIGlTextureSystem;

      if (!glTextures || !this.texturehook) {
        console.error('[PIXI Hooks] !glTextures || !this.texturehook');
      } else {
        const glTexturesArray = Object.values(glTextures);

        console.log(
          '[PIXI Hooks] Collect used textures:',
          glTexturesArray.length
        );

        glTexturesArray.forEach((glTexture) => {
          if (glTexture.gl === renderer.gl && glTexture.texture) {
            this.texturehook!.registerTexture(glTexture.texture);
          }
        });
      }
    } else {
      console.error('[PIXI Hook] Canvas renderer is not allowed');
    }
  }
}
