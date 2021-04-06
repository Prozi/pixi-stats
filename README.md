pixi-stats
========

#### JavaScript Performance Monitor ####

This class provides an info box that will help you monitor your code performance.

* **FPS** Frames rendered in the last second. The higher the number the better.
* **MS** Milliseconds needed to render a frame. The lower the number the better.
* **MB** MBytes of allocated memory. (Run Chrome with `--enable-precise-memory-info`)
* **DC** Draw Calls made within one frame.
* **TC** Texture Count used within one frame.
* **CUSTOM** User-defined panel support.


### Screenshots ###

![fps.png](https://raw.githubusercontent.com/mrdoob/stats.js/master/files/fps.png)
![ms.png](https://raw.githubusercontent.com/mrdoob/stats.js/master/files/ms.png)
![mb.png](https://raw.githubusercontent.com/mrdoob/stats.js/master/files/mb.png)
![custom.png](https://raw.githubusercontent.com/mrdoob/stats.js/master/files/custom.png)


### Installation ###
```bash
npm install pixi-stats pixi.js --save
```

### Usage ###
```typescript
import { Application, Ticker } from 'pixi.js';
import { addStats, Stats } from 'pixi-stats/lib/stats';

const app: Application = new Application({});
const stats: Stats = addStats(document, app);
const ticker: Ticker = Ticker.shared;

ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);
```

```css
div#stats {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 500;
  width: max(200px, 10vw, 10vh);
  height: max(100px, 6vh, 6vw);
  opacity: 0.8;
  user-select: none;
}
```

### Contributors ###

The credit goes to:
- https://github.com/mrdoob/stats.js/ - FPS, MS, MB counters
- https://github.com/eXponenta/gstatsjs/ - DC, TC counters
- https://github.com/Prozi/ - exported as typescript library

### License ###

MIT

