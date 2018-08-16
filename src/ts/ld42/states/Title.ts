namespace LD42 {
  // Imports
  import ItemGroup = Interfaces.ItemGroup;
  import Control = Controls.Control;

  /**
   * UNLOCKR : LD42/States/Title
   * --------------------------------------------------------------------
   * Title screen.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Title extends Phaser.State {
    // Properties
    // ------------------------------------------------------------------

    /**
     * Controller instance.
     */
    controller: Control;

    /**
     * Background graphics instance.
     */
    bg: Phaser.Graphics;

    /**
     * Title sprite handler.
     */
    title: Phaser.Sprite;

    /**
     * Credits text handler.
     */
    credit: Phaser.BitmapText;

    /**
     * Press start text handler.
     */
    press: Phaser.BitmapText;

    /**
     * Intro finish status (for the blinking).
     */
    finish: boolean = false;

    /**
     * Sounds group.
     */
    sounds: ItemGroup;

    /**
     * Status of the current state.
     */
    status: number = -1;

    // Methods
    // ------------------------------------------------------------------

    /**
     * State values bootstrapper.
     *
     * @private
     */
    __boot() {
      this.bg         = null;
      this.controller = null;
      this.credit     = null;
      this.finish     = false;
      this.press      = null;
      this.sounds     = null;
      this.status     = -1;
      this.title      = null;
    }

    /**
     * Loads the sounds used by the state.
     */
    loadSounds() {
      this.sounds.intro = this.game.add.sound(
        "ld42_intro",
        0,
        true
      );

      this.sounds.start = this.game.add.sound(
        "snd_start_01",
        0.3,
        false
      );
    }

    /**
     * Draws the title screen's elements.
     */
    drawTitleScreen() {
      // Add the white background
      this.bg = this.game.add.graphics(0, 0);
      this.bg.alpha = 0;
      this.bg.beginFill(0xffffff);
      this.bg.drawRect(0, 0, 64, 64);
      this.bg.endFill();

      // Tween the background
      this.game.add.tween(this.bg).to(
        {
          alpha: 1
        },
        500,
        Phaser.Easing.Linear.None,
        true,
        0,
        0,
        false
      );

      // Title
      this.title = this.game.add.sprite(0, 0, "ui_title", 0);
      this.title.anchor.setTo(0.5, 0.5);
      this.title.x = this.world.centerX;
      this.title.y = this.world.centerY + 8;
      this.title.alpha = 0;

      // Tween the title
      this.game.add.tween(this.title).to(
        {
          y: 21,
          alpha: 1
        },
        500,
        Phaser.Easing.Quintic.Out,
        true,
        500,
        0,
        false
      );

      // Credits
      this.credit = this.game.add.bitmapText(
        0,
        0,
        "envy_code_r",
        "©2018 YUITI",
        12
      );
      this.credit.tint = 0x000000;
      this.credit.alpha = 0;
      this.credit.anchor.setTo(0.5, 0.5);
      this.credit.x = this.world.centerX;
      this.credit.y = 72;

      // Tween the credits
      this.game.add.tween(this.credit).to(
        {
          y: 60,
          alpha: 1
        },
        500,
        Phaser.Easing.Quintic.Out,
        true,
        700,
        0,
        false
      );

      // Press Enter text
      this.press = this.game.add.bitmapText(
        0,
        0,
        "envy_code_r",
        "PRESS ENTER",
        12
      );
      this.press.tint = 0xcccccc;
      this.press.alpha = 0;
      this.press.anchor.setTo(0.5, 0.5);
      this.press.x = this.world.centerX;
      this.press.y = 49;

      // Tween the press enter
      this.game.add.tween(this.press).to(
        {
          alpha: .5
        },
        300,
        Phaser.Easing.Quintic.Out,
        true,
        1000,
        0,
        false
      ).onComplete.add(function() {
        // Set finished to true and status to initialized
        this.finish = true;
        this.status = 0;
      }, this);
    }

    /**
     * Default status action.
     */
    statusDefault() {
      // If finish, blink press action
      if (this.finish === true) {
        this.press.alpha = 1 * Math.abs(Math.sin(this.game.time.now / 512));
      }

      // On start pressed
      if (this.controller.controls.start.pressed) {
        // Set status to 1
        this.status = 1;

        // Play sound
        this.sounds.start.play();

        // Add title tween
        this.game.add.tween(this.title).to(
          {
            alpha: 0
          },
          300,
          Phaser.Easing.Linear.None,
          true,
          100
        );
        this.game.add.tween(this.title).to(
          {
            y: -16
          },
          300,
          Phaser.Easing.Back.In,
          true
        ).onComplete.add(function() {
          // Set status to pressed
          this.status = 2;
        }, this);

        // Add credits tween
        this.game.add.tween(this.credit).to(
          {
            alpha: 0
          },
          300,
          Phaser.Easing.Linear.None,
          true,
          100
        );
        this.game.add.tween(this.credit).to(
          {
            y: 70
          },
          300,
          Phaser.Easing.Back.In,
          true
        );
      }
    }

    /**
     * Start pressed status.
     */
    statusPressed() {
      // Blink faster
      this.press.alpha = 1 * Math.abs(Math.sin(this.game.time.now / 64));
    }

    /**
     * Fade out status.
     */
    statusFade() {
      // Fade action
      this.game.add.tween(this.press).to(
        {
          alpha: 0
        },
        200,
        Phaser.Easing.Linear.None,
        true,
        100
      );

      // Fade out intro volume
      this.game.add.tween(this.sounds.intro).to(
        {
          volume: 0
        },
        400,
        Phaser.Easing.Linear.None,
        true,
        0,
        0,
        false
      ).onComplete.add(function() {
        // Stop intro
        this.sounds.intro.stop();
      }, this);

      // Fade background
      this.game.add.tween(this.bg).to(
        {
          alpha: 0
        },
        300,
        Phaser.Easing.Linear.None,
        true,
        100
      ).onComplete.add(function() {
        // Change state
        this.status = 3;
      }, this);
    }

    // Lifecycle methods
    // ------------------------------------------------------------------

    /**
     * Executes the state.
     */
    create() {
      // Bootstraps
      this.__boot();

      // Starts the controller
      this.controller = new Control(this.game);

      // Loads the sounds
      this.sounds = {};
      this.loadSounds();

      // Starts playing the intro and fade in
      this.sounds.intro.play();
      this.game.add.tween(this.sounds.intro).to(
        {
          volume: 0.5
        },
        1000,
        Phaser.Easing.Linear.None,
        true,
        500,
        0,
        false
      );

      // Draw the title screen
      this.drawTitleScreen();
    }

    /**
     * Updates the state.
     */
    update() {
      // Executes actions according to the current state's status
      switch (this.status) {
        case 1:
          this.statusPressed();
          break;
        case 2:
          this.statusFade();
          break;
        case 3:
          // Changes state
          this.state.start("Play");
          break;
        default:
          this.statusDefault();
          break;
      }
    }

    /**
     * Shutdowns the state, removes all children, etc.
     */
    shutdown() {
      // Remove all children
      this.game.world.removeAll(true);

      // Enforce reset of all properties
      this.__boot();

    }
  }
}
