namespace LD42 {
  import Control = Controls.Control;

  export class Main extends Phaser.State {
    /**
     * Controller instance.
     */
    controller: Control;

    shutdown() {
      this.world.removeAll();
    }

    create() {
      // Initialize controller
      this.controller = new Control(this.game, "controller_p1");

      let overText = this.game.add.bitmapText(
        0,
        0,
        "yx_ui",
        "UNLOCKR",
        10
      );
      overText.anchor.setTo(0.5, 0.5);
      overText.tint = 0xffffff;
      overText.x = this.game.world.centerX;
      overText.y = this.game.world.centerY + 16;
      overText.alpha = 0;

      this.game.add.tween(overText).to(
        {
          y: this.game.world.centerY - 16,
          alpha: 1
        },
        500,
        Phaser.Easing.Quintic.Out,
        true,
        100,
        0,
        false
      );

      let startText = this.game.add.bitmapText(
        0,
        0,
        "yx_ui",
        "Press Enter\nto Start",
        10
      );
      startText.anchor.setTo(0.5, 0.5);
      startText.tint = 0xffffff;
      startText.x = this.game.world.centerX;
      startText.y = this.game.world.centerY + 16;
      startText.alpha = 0;

      this.game.add.tween(startText).to(
        {
          y: this.game.world.centerY,
          alpha: 1
        },
        500,
        Phaser.Easing.Quintic.Out,
        true,
        100,
        0,
        false
      );

    }

    update() {
      if (this.controller.controls.start.pressed) {
        this.state.start("PlayTest", true, false);
      }
    }
  }
}