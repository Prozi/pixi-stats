import BaseHooks from '@jacekpietal/gstats/dist/BaseHooks';
import { Application, WebGLRenderer } from 'pixi.js';
import { Panel } from './stats-panel';
import { Stats } from './stats';

export class StatsJSAdapter {
  stats!: Stats;
  hook: any;
  dcPanel!: Panel;
  tcPanel!: Panel;

  constructor(hook: any, stats?: Stats) {
    this.hook = hook;

    if (stats) {
      this.stats = stats;
    } else if ((window as any).Stats) {
      this.stats = new (window as any).Stats();
    }

    if (this.stats) {
      this.dcPanel = this.stats.addPanel(new Panel('DC', '#f60', '#300'));
      this.tcPanel = this.stats.addPanel(new Panel('TC', '#0c6', '#033'));

      this.stats.showPanel(0);
    } else {
      throw new Error("Stats can't found in window, pass instance of Stats.js as second param");
    }
  }

  update(): void {
    if (this.stats) {
      if (this.hook) {
        this.dcPanel.update(this.hook.deltaDrawCalls, Math.max(50, this.hook.maxDeltaDrawCalls));
        this.tcPanel.update(this.hook.texturesCount, Math.max(20, this.hook.maxTextureCount));
      }

      this.stats.update();
    }
  }

  reset(): void {
    if (this.hook) this.hook.reset();
  }
}

export class PIXIHooks extends BaseHooks {
  constructor(app: Application) {
    super();

    if (!app) {
      console.error('[PIXI Hooks] missing PIXI.Application');

      return;
    }

    const renderer = app.renderer as WebGLRenderer;

    if (renderer.gl) {
      this.attach(renderer.gl);

      // const startTextures = renderer.texture.managedTextures;
      const glTextures = (renderer.texture as any)._glTextures as Record<string, any>;

      if (!glTextures || !this.texturehook) {
        console.error('[PIXI Hooks] !glTextures || !this.texturehook');
      } else {
        console.log('[PIXI Hooks] Collect used textures:', glTextures.length);

        // for (let i = 0; i < startTextures.length; i++) {
        //   const txr = startTextures[i];
        Object.values(glTextures).forEach((glTexture) => {
          if (glTexture.gl === renderer.gl) {
            this.texturehook!.registerTexture(glTexture.texture);
          }
        });
        // }
      }
    } else {
      console.error('[PIXI Hook] Canvas renderer is not allowed');
    }
  }
}
