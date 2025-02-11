# pixi-stats

[<img src="https://img.shields.io/npm/v/pixi-stats?style=for-the-badge&color=success" alt="npm version" />](https://www.npmjs.com/package/pixi-stats?activeTab=versions)
[<img src="https://img.shields.io/npm/dw/pixi-stats.svg?style=for-the-badge&color=success" alt="npm downloads per week" />](https://www.npmjs.com/package/pixi-stats)

#### JavaScript Performance Monitor

This library provides an info box that will help you monitor your code performance.

- **FPS** Frames rendered in the last second. The higher the number the better.
- **MS** Milliseconds needed to render a frame. The lower the number the better.
- **MB** MBytes of allocated memory. (Run Chrome with `--enable-precise-memory-info`)
- **DC** Draw Calls made within one frame.
- **TC** Texture Count used within one frame.
- **CUSTOM** User-defined panel support.

### Screenshots

![fps.png](https://raw.githubusercontent.com/mrdoob/stats.js/master/files/fps.png)
![ms.png](https://raw.githubusercontent.com/mrdoob/stats.js/master/files/ms.png)
![mb.png](https://raw.githubusercontent.com/mrdoob/stats.js/master/files/mb.png)
![custom.png](https://raw.githubusercontent.com/mrdoob/stats.js/master/files/custom.png)

### Usage (pixi.js)

```ts
import { Application } from 'pixi.js';
import { Stats } from 'pixi-stats';

const { renderer } = new Application();
const stats = new Stats(renderer);
```

### Usage (three.js)

```ts
import { Renderer } from 'three';
import { Stats } from 'pixi-stats';

const renderer = new Renderer();
const stats = new Stats(renderer);
```

### Installation

```bash
npm install pixi-stats --save
```

### Set CSS

```css
div#stats {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: max(200px, 10vw, 10vh);
  height: max(100px, 5vh, 5vw);
  user-select: none;
}
```

### Contributors

The credit goes to:

- https://github.com/mrdoob/stats.js/ - FPS, MS, MB counters
- https://github.com/eXponenta/gstatsjs/ - DC, TC counters
- https://github.com/Prozi/ - maintainer, fixes, updates

### License

MIT

### You can buy me a coffee

https://paypal.me/jacekpietal
