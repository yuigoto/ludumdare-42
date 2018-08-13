namespace LD42 {
  import Point = Phaser.Point;
  import Control = Controls.Control;
  import ItemGroup = Interfaces.ItemGroup;
  import GroupCollection = Interfaces.GroupCollection;

  /**
   * LD42 : LD42/States/Test
   * --------------------------------------------------------------------
   * Test and debug sprites and elements, or just whatever, in here.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Test extends Phaser.State {
    // Properties
    // ------------------------------------------------------------------

    /**
     * Degree counter.
     */
    degrees: number = 0;

    /**
     * Player controller instance.
     */
    controller: Control;

    /**
     * Test player object.
     */
    dial: Dial;

    /**
     * Next player object.
     */
    nextDial: Dial;

    /**
     * The game's background sprite object.
     */
    game_bg: Phaser.TileSprite;

    /**
     * Just some test timer.
     */
    count: number;

    /**
     * Handles global and ui sounds.
     */
    soundGroup: ItemGroup;

    /**
     * User interface group.
     */
    uiGroup: ItemGroup;

    objectGroups: GroupCollection;

    // Lifecycle methods
    // ------------------------------------------------------------------

    /**
     * Bootstraps the state.
     */
    create() {
      // Initial count value
      this.count = 0;

      // Initialize controller
      this.controller = new Control(this.game, "controller_p1");

      // Draw backdrop
      this.game_bg = this.game.add.tileSprite(0, 0, 64, 64, "bg_main");
      this.game_bg.alpha = 0.5;

      // GAME ELEMENT GROUPS
      this.objectGroups = {
        next: this.game.add.group(),
        current: this.game.add.group()
      };

      this.dial = new Dial(
        this.game,
        this.game.world.centerX,
        this.game.world.centerY
      );

      this.nextDial = new Dial(
        this.game,
        this.game.world.centerX,
        this.game.world.centerY
      );
      this.nextDial.scale.setTo(0.5, 0.5);

      this.objectGroups.next.add(this.nextDial);
      this.objectGroups.current.add(this.dial);

      // UI ELEMENTS GO HERE
      this.soundGroup = {};
      this.uiGroup = {};

      this.soundGroup.door_01 = this.game.add.sound(
        "snd_door_01",
        0.5,
        false
      );

      this.uiGroup.dialText = this.game.add.text(
        0,
        0,
        this.degrees.toString(),
        {
          align: "center",
          fill: "#000",
          font: "yx_ui",
          fontSize: 8,
          fontWeight: 400
        }
      );
      this.uiGroup.dialText.x = this.game.world.centerX - this.uiGroup.dialText.width / 2;
      this.uiGroup.dialText.y = this.game.world.centerY - this.uiGroup.dialText.height / 2;
    }

    /**
     * Updates the state on every frame.
     */
    update() {
      // Handle dial turning
      this.handleDial();

      this.game_bg.alpha = Math.abs(1 * Math.sin(this.count / 8));

      /*
      this.dial.scale.setTo(
        1 + (.5 * Math.sin(this.count / 8)),
        1 + (.5 * Math.sin(this.count / 8))
      );
      */

      if (this.dial.turn != 0) {
        this.degrees += this.dial.turn;
      }

      if (
        Math.abs(this.degrees) < 5
        && this.dial.direction != 0
        && !this.soundGroup.door_01.isPlaying
      ) {
        // this.soundGroup.door_01.play();
      }

      if (this.controller.controls.start.pressed) {
        let current = this.dial;
        this.soundGroup.door_01.play();

        this.count = 0;

        this.dial = this.nextDial;
        this.objectGroups.current.add(this.dial);
        this.game.add.tween(this.dial.scale).to(
          {
            x: 1,
            y: 1
          },
          500,
          Phaser.Easing.Linear.None,
          true,
          200,
          0,
          false
        );

        this.nextDial = new Dial(
          this.game,
          this.game.world.centerX,
          this.game.world.centerY
        );
        this.objectGroups.next.add(this.nextDial);
        this.nextDial.scale.set(0.5, 0.5);

        current.bringToTop();
        current.speed = 0;
        current.direction = 0;
        let tween = this.game.add.tween(current).to(
          {
            x: current.x + 3,
            y: 128
          },
          1000,
          Phaser.Easing.Back.InOut,
          true,
          0,
          0
        );
        this.game.add.tween(current.scale).to(
          {
            x: 2,
            y: 2
          },
          500,
          Phaser.Easing.Linear.None,
          true,
          0,
          0,
          false
        );

        tween.onComplete.add(function() {
          // this.game.tween.remove(this);
          current.destroy();
        }, this);
      }

      this.count += 0.5;

      this.uiGroup.dialText.text = Math.abs(this.degrees).toString();
      this.uiGroup.dialText.x = this.game.world.centerX - this.uiGroup.dialText.width / 2;
      this.uiGroup.dialText.y = this.game.world.centerY - this.uiGroup.dialText.height / 2;
    }

    // Methods
    // ------------------------------------------------------------------

    /**
     * Handles dial turning.
     */
    handleDial() {
      // Get controller
      let { controls } = this.controller;

      this.dial.direction = controls.right.hold - controls.left.hold;
    }
  }
}
