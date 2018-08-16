namespace LD42 {
  /**
   * UNLOCKR : LD42/States/Preload
   * --------------------------------------------------------------------
   * Preloads all the game's assets.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Preload extends Phaser.State {
    // Properties
    // ------------------------------------------------------------------

    /**
     * Preloader bar sprite.
     */
    preloadBar: Phaser.Sprite;

    /**
     * Preloader bar wrapper.
     */
    preloadOut: Phaser.Sprite;

    // Methods
    // ------------------------------------------------------------------

    /**
     * Defines preloader images from the bootstrapper's cache.
     */
    setLoaderImages() {
      // Preload wrapper
      this.preloadOut = this.add.sprite(
        this.game.world.centerX,
        this.game.world.centerY,
        "loader_out"
      );
      this.preloadOut.x -= this.preloadOut.width / 2;
      this.preloadOut.y -= this.preloadOut.height / 2;

      // Preload bar
      this.preloadBar = this.add.sprite(
        this.game.world.centerX,
        this.game.world.centerY,
        "loader_in"
      );
      this.preloadBar.anchor.setTo(0, 0);
      this.preloadBar.x -= this.preloadBar.width / 2;
      this.preloadBar.y -= this.preloadBar.height / 2;

      // Set loader sprite
      this.load.setPreloadSprite(this.preloadBar, 0);
    }

    // Lifecycle methods
    // ------------------------------------------------------------------

    /**
     * Bootstraps state data and assets.
     */
    preload() {
      this.setLoaderImages();

      // ASSET LOADING
      // ----------------------------------------------------------------

      // Images
      for (let image of Assets.image) {
        if (!image.ignore) {
          this.load.image(image.name, image.file, image.overwrite);
        }
      }

      // Sounds
      for (let sound of Assets.sound) {
        if (!sound.ignore) {
          this.load.audio(sound.name, sound.file, sound.autoDecode);
        }
      }

      // Spritesheets
      for (let spritesheet of Assets.spritesheet) {
        if (!spritesheet.ignore) {
          this.load.spritesheet(
            spritesheet.name,
            spritesheet.file,
            spritesheet.frameWidth,
            spritesheet.frameHeight,
            spritesheet.frameMax,
            spritesheet.margin,
            spritesheet.spacing,
            spritesheet.skipFrames
          );
        }
      }

      // Bitmap fonts
      for (let bitmapfont of Assets.bitmapfont) {
        if (!bitmapfont.ignore) {
          this.load.bitmapFont(
            bitmapfont.name,
            bitmapfont.texture,
            bitmapfont.atlas,
            bitmapfont.atlasData
          );
        }
      }

      // Load @font-face fonts (i.e.: Google Fonts, etc.) here
    }

    /**
     * Executes the state.
     */
    create() {
      this.state.start("Title");
    }
  }
}
