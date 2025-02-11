import { IStats } from './model';
import { PIXIHooks } from './pixi-hooks';
import { Panel } from './stats-panel';

export class StatsJSAdapter {
  hook: PIXIHooks;
  stats: IStats;

  dcPanel?: Panel;
  tcPanel?: Panel;

  constructor(hook: PIXIHooks, stats: IStats) {
    this.hook = hook;
    this.stats = stats;

    if (this.hook.hooked) {
      this.dcPanel = this.stats.addPanel(new Panel('DC', '#f60', '#300'));
      this.tcPanel = this.stats.addPanel(new Panel('TC', '#0c6', '#033'));
    }
  }

  update(): void {
    if (!this.stats) {
      return;
    }

    if (this.hook) {
      this.dcPanel?.update(
        this.hook.deltaDrawCalls,
        Math.max(50, this.hook.maxDeltaDrawCalls)
      );

      this.tcPanel?.update(
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
