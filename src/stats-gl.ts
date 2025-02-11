import BaseHooks from './hooks/BaseHooks';
import { Renderer, IStats, Texture } from './model';
import { Panel } from './stats-panel';

export interface PIXIGlTexture {
  gl: WebGLRenderingContext;
  texture: Texture;
}

export type PIXIGlTextureArray = PIXIGlTexture[];

export type PIXIGlTextureRecord = Record<string, PIXIGlTexture>;

export interface PIXIRendererGlTexture {
  // pixi v6
  managedTextures?: PIXIGlTextureArray;
  // pixi v8
  _glTextures?: PIXIGlTextureRecord;
}

export class StatsJSAdapter {
  hook: PIXIHooks;
  stats: IStats;

  dcPanel: Panel;
  tcPanel: Panel;

  constructor(hook: PIXIHooks, stats: IStats) {
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
    if (!this.stats) {
      return;
    }

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

  reset(): void {
    if (this.hook) {
      this.hook.reset();
    }
  }
}

export class PIXIHooks extends BaseHooks {
  constructor(renderer: Renderer) {
    super();

    if (!renderer) {
      console.error('[PIXI Hooks] missing Renderer');

      return;
    }

    if (renderer.gl) {
      this.attach(renderer.gl);

      const texture = renderer.texture as unknown as PIXIRendererGlTexture;

      // pixi v6 compatibility
      const glTextures = texture._glTextures || texture.managedTextures;

      // pixi v6 compatibility
      const glTexturesArray = Array.isArray(glTextures)
        ? glTextures
        : Object.values(glTextures as PIXIGlTextureRecord);

      if (!glTexturesArray || !this.texturehook) {
        console.error('[PIXI Hooks] !glTextures || !this.texturehook');
      } else {
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
      console.error('[PIXI Hook] gl in renderer not hooked');
    }
  }
}
