import { IStats } from './model';
import { PIXIHooks } from './pixi-hooks';
import { Panel } from './stats-panel';
export declare class StatsJSAdapter {
    hook: PIXIHooks;
    stats: IStats;
    dcPanel?: Panel;
    tcPanel?: Panel;
    constructor(hook: PIXIHooks, stats: IStats);
    update(): void;
    reset(): void;
}
//# sourceMappingURL=stats-adapter.d.ts.map