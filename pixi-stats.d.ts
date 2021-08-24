declare module 'pixi-stats' {
  export class StatsJSAdapter {
    constructor(...args: any[]);

    update(...args: any[]): void;
  }

  export class Panel {
    pushValue(value: number): void;

    update(value: number, maxValue: number): void;
  }

  export class Stats {
    update(...args: any[]): void;

    addPanel(panel: Panel): Panel;

    showPanel(id: number): void;

    begin(): void;

    end(): number;

    update(): void;
  }

  export function addStats(...args: any[]): StatsJSAdapter;
}
