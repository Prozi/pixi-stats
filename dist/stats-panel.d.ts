export declare class Panel {
    values: number[];
    snapshotSize: number;
    name: string;
    dom: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    fg: string;
    bg: string;
    constructor(name: string, fg: string, bg: string);
    get min(): string;
    get max(): string;
    get averageValue(): string;
    pushValue(value: number): void;
    update(value: number, maxValue: number): void;
}
//# sourceMappingURL=stats-panel.d.ts.map