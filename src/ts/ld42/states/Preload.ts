namespace LD42 {
  export class Preload extends Phaser.State {
    /**
     * Preload bar sprite handle.
     */
    preloadBar: Phaser.Sprite;

    /**
     * Preload bar sprite outer.
     */
    preloadOut: Phaser.Sprite;

    // Lifecycle methods
    // ------------------------------------------------------------------

    /**
     * Preloads state/game.
     */
    preload() {
      // Set preloader
      this.setLoaderImage();

      // TODO: Get assets list

      // TODO: Load images

      // TODO: Load sounds

      // TODO: Load spritesheets (if used)

      // TODO: Google Fonts or Local Fonts
    }

    /**
     * Runs the state.
     */
    create() {
      // this.state.start("Main");
    }

    // Methods
    // ------------------------------------------------------------------

    /**
     * Sets the preloader sprites.
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
  }
}