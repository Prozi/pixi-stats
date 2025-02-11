import BaseHooks from './hooks/BaseHooks';
import { PIXIGlTextureRecord, PIXIRendererGlTexture, Renderer } from './model';

export class PIXIHooks extends BaseHooks {
  get hooked() {
    return !!this.glhook;
  }

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
        console.error('[PIXI Stats] !glTextures || !this.texturehook');
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
      console.warn('[PIXI Stats] gl in renderer not hooked');
    }
  }
}
