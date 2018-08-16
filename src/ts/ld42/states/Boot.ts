namespace LD42 {
  /**
   * UNLOCKR : LD42/States/Boot
   * --------------------------------------------------------------------
   * Bootstraps the game.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Boot extends Phaser.State {
    /**
     * Preloads state assets.
     */
    preload() {
      // Set scale mode and set it to render as crisp as possible
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

      // Preload loader bar images
      this.load.image("loader_in", "assets/img/ui/ui_loader_in.png", false);
      this.load.image("loader_out", "assets/img/ui/ui_loader_out.png", false);
    }

    /**
     * Executes the state.
     */
    create() {
      // No need for multitouch, one pointer is enough
      this.input.maxPointers = 1;

      // No stage smoothing
      this.stage.smoothed = false;

      // Pause game if tab/window loses focus
      this.stage.disableVisibilityChange = true;

      if (this.game.device.desktop) {
        // Desktop-specific stuff
        this.scale.pageAlignHorizontally = true;
      } else {
        // Mobile-specific stuff
      }

      // Fire preloader state
      this.state.start("Preload");
    }
  }
}
