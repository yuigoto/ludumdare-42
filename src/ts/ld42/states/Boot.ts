namespace LD42 {
  export class Boot extends Phaser.State {
    /**
     * Preloads state assets.
     */
    preload() {
      this.load.image("loader_in", "assets/ui/loader_in.png", false);
      this.load.image("loader_out", "assets/ui/loader_out.png", false);

      // Stretch game
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    create() {
      // 1 pointer is enough, no multitouch here
      this.input.maxPointers = 1;

      // Pause if loses focus
      this.stage.disableVisibilityChange = true;

      // Desktop/mobile stuff
      if (this.game.device.desktop) {
        this.scale.pageAlignHorizontally = true;
      } else {
      }

      // Start preloader
    }
  }
}