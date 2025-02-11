import { Renderer } from './model';
import { PIXIHooks } from './pixi-hooks';
import { StatsJSAdapter } from './stats-adapter';
import { Panel } from './stats-panel';

export class Stats {
  mode = 0;
  frames = 0;

  beginTime: number;
  prevTime: number;
  domElement: HTMLDivElement;

  pixiHooks: PIXIHooks;
  adapter: StatsJSAdapter;

  fpsPanel: Panel;
  msPanel: Panel;
  memPanel?: Panel;

  constructor(
    renderer: Renderer,
    containerElement: HTMLElement = document.body
  ) {
    this.beginTime = (performance || Date).now();
    this.prevTime = this.beginTime;

    this.domElement = document.createElement('div');
    this.domElement.id = 'stats';
    this.domElement.addEventListener(
      'click',
      (event) => {
        event.preventDefault();

        this.showPanel(++this.mode % this.domElement.children.length);
      },
      false
    );

    this.fpsPanel = this.addPanel(new Panel('FPS', '#3ff', '#002'));
    this.msPanel = this.addPanel(new Panel('MS', '#0f0', '#020'));

    if ('memory' in performance) {
      this.memPanel = this.addPanel(new Panel('MB', '#f08', '#200'));
    }

    this.pixiHooks = new PIXIHooks(renderer);
    this.adapter = new StatsJSAdapter(this.pixiHooks, this);
    this.showPanel(0);

    containerElement.appendChild(this.domElement);

    if ('animations' in renderer) {
      renderer.animations.push(() => {
        this.adapter.update();
      });
    } else {
      const frame = () => {
        this.adapter.update();
        requestAnimationFrame(frame);
      };

      frame();
    }
  }

  addPanel(panel: Panel): Panel {
    this.domElement.appendChild(panel.dom);

    return panel;
  }

  showPanel(id: number) {
    for (let index = 0; index < this.domElement.children.length; index++) {
      const element: HTMLElement = this.domElement.children[
        index
      ] as HTMLElement;

      element.style.display = index === id ? 'block' : 'none';
    }

    this.mode = id;
  }

  begin(): void {
    this.beginTime = (performance || Date).now();
  }

  end(): number {
    this.frames++;

    const time: number = (performance || Date).now();

    this.msPanel.update(time - this.beginTime, 200);

    if (time > this.prevTime + 1000) {
      this.fpsPanel.update((this.frames * 1000) / (time - this.prevTime), 100);

      this.prevTime = time;
      this.frames = 0;

      if (this.memPanel && 'memory' in performance) {
        const memory = performance.memory as {
          usedJSHeapSize: number;
          jsHeapSizeLimit: number;
        };

        this.memPanel.update(
          memory.usedJSHeapSize / 1048576,
          memory.jsHeapSizeLimit / 1048576
        );
      }
    }

    return time;
  }

  update(): void {
    this.beginTime = this.end();
  }
}
