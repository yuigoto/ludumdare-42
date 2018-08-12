namespace LD42 {
  /**
   * LD42 : LD42/States/Boot
   * --------------------------------------------------------------------
   * Game bootstrapping state.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Boot extends Phaser.State {
    /**
     * Preload state assets.
     */
    preload() {
      // Set scale mode and set to render as crisp as possible
      this.game.scale.scaleMode  = Phaser.ScaleManager.SHOW_ALL;
      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

      // Loads loader images
      this.load.image("loader_in", "assets/img/ui/loader_in.png", false);
      this.load.image("loader_out", "assets/img/ui/loader_out.png", false);
    }

    /**
     * Executes.
     */
    create() {
      // We don't need multitouch, so 1 pointer is enough
      this.input.maxPointers = 1;

      // No smoothing on our stage
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
      this.state.start("Preload", true, false);
    }
  }
}
