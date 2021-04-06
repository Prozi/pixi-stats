declare module 'pixi-stats' {
  export class StatsJSAdapter {
    constructor(...args: any[]);

    update(...args: any[]): void;
  }

  export function addStats(...args: any[]): StatsJSAdapter;
}
