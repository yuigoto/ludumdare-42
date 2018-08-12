namespace LD42 {
  /**
   * LD42 : LD42/States/Preload
   * --------------------------------------------------------------------
   * Preloads game assets.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Preload extends Phaser.State {
    /**
     * Preload bar sprite.
     */
    preloadBar: Phaser.Sprite;

    /**
     * Preload bar wrapper.
     */
    preloadOut: Phaser.Sprite;

    // Methods
    // ------------------------------------------------------------------

    /**
     * Sets preloader sprites.
     */
    setLoaderImage() {
      // Wrapper
      this.preloadOut = this.add.sprite(
        this.game.world.centerX,
        this.game.world.centerY,
        "loader_out"
      );
      this.preloadOut.x -= this.preloadOut.width / 2;
      this.preloadOut.y -= this.preloadOut.height / 2;

      // Bar
      this.preloadBar = this.add.sprite(
        this.game.world.centerX,
        this.game.world.centerY,
        "loader_in"
      );
      this.preloadBar.anchor.setTo(0, 0);
      this.preloadBar.x -= this.preloadBar.width / 2;
      this.preloadBar.y -= this.preloadBar.height / 2;

      // Set as preloader sprite
      this.load.setPreloadSprite(this.preloadBar, 0);
    }

    // Lifecycle Methods
    // ------------------------------------------------------------------

    /**
     * Handles preloading of the assets.
     */
    preload() {
      // Set preloader images
      this.setLoaderImage();

      // Uses Assets to load assets

      // Images
      for (let image of Assets.image) {
        if (!image.ignore) {
          this.load.image(image.name, image.file, image.overwrite);
        }
      }

      // Sounds
      for (let sound of Assets.sound){
        if (!sound.ignore) {
          this.load.audio(sound.name, sound.file, sound.autoDecode);
        }
      }

      // Spritesheet
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

      // TODO: Load fonts here
    }

    /**
     * Fires up the state.
     */
    create() {
      // this.state.start("Main");
      this.state.start("Test");
    }
  }
}
