namespace LD42 {
  import approach = Helpers.approach;
  import ItemGroup = Interfaces.ItemGroup;

  /**
   * LD42 : LD42/Objects/Dial
   * --------------------------------------------------------------------
   * The player dial object.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Dial extends Phaser.Sprite {
    /**
     * The current direction the player's holding:
     * -1: left
     * 1: right
     */
    public direction: number = 0;

    /**
     * How much the dial will turn.
     *
     * Is the accessible value from outside.
     */
    public turn: number = 0;

    public speed: number = 0;
    public speed_max: number = 8;
    public factor_accel: number = 0.5;
    public factor_decel: number = 1.0;
    public sound_time: number = 0;
    public sound_group: ItemGroup;

    /**
     * Constructor.
     *
     * @param {Phaser.Game} game
     * @param {number} x
     * @param {number} y
     * @param {Phaser.Group} group
     */
    constructor(
      game: Phaser.Game,
      x: number,
      y: number,
      group: Phaser.Group = null
    ) {
      super(game, x, y, "spr_lock", 0);

      this.sound_group = {};
      this.loadSounds();

      // Set anchor at center
      this.anchor.setTo(0.5, 0.5);

      // Add object to game
      game.add.existing(this);
    }

    // Lifecycle methods
    // ------------------------------------------------------------------

    /**
     * Updates state on every frame.
     */
    update() {
      this.handleTurn();
    }

    // Methods
    // ------------------------------------------------------------------

    /**
     * Sets the dial's sounds.
     */
    loadSounds() {
      this.sound_group.dial_01 = this.game.add.sound(
        "snd_dial_01",
        .3,
        false
      );
      this.sound_group.dial_02 = this.game.add.sound(
        "snd_dial_02",
        .3,
        false
      );
      this.sound_group.dial_03 = this.game.add.sound(
        "snd_dial_03",
        .3,
        false
      );
      this.sound_group.dial_04 = this.game.add.sound(
        "snd_dial_04",
        .3,
        false
      );
      this.sound_group.dial_05 = this.game.add.sound(
        "snd_dial_05",
        .3,
        false
      );
      this.sound_group.dial_06 = this.game.add.sound(
        "snd_dial_06",
        .3,
        false
      );
      this.sound_group.dial_07 = this.game.add.sound(
        "snd_dial_07",
        .3,
        false
      );
      this.sound_group.dial_08 = this.game.add.sound(
        "snd_dial_08",
        .3,
        false
      );
      this.sound_group.dial_09 = this.game.add.sound(
        "snd_dial_09",
        .3,
        false
      );
      this.sound_group.dial_10 = this.game.add.sound(
        "snd_dial_10",
        .3,
        false
      );
      this.sound_group.dial_11 = this.game.add.sound(
        "snd_dial_11",
        .3,
        false
      );
      this.sound_group.dial_12 = this.game.add.sound(
        "snd_dial_12",
        .3,
        false
      );
    }

    /**
     * Plays the dial sound.
     */
    playSound() {
      switch (Math.floor(Math.random() * 12)) {
        case 2:
          this.sound_group.dial_02.play();
          break;
        case 3:
          this.sound_group.dial_03.play();
          break;
        case 4:
          this.sound_group.dial_04.play();
          break;
        case 5:
          this.sound_group.dial_05.play();
          break;
        case 6:
          this.sound_group.dial_06.play();
          break;
        case 7:
          this.sound_group.dial_07.play();
          break;
        case 8:
          this.sound_group.dial_08.play();
          break;
        case 9:
          this.sound_group.dial_09.play();
          break;
        case 10:
          this.sound_group.dial_10.play();
          break;
        case 11:
          this.sound_group.dial_11.play();
          break;
        case 12:
          this.sound_group.dial_12.play();
          break;
        default:
          this.sound_group.dial_01.play();
          break;
      }
    }

    /**
     * Handles the dial's turn, based on the direction the player's holding.
     */
    handleTurn() {
      if (this.direction != 0) {
        this.speed = approach(
          this.speed,
          this.speed_max * this.direction,
          this.factor_accel
        );
      } else {
        this.speed = approach(
          this.speed,
          0,
          this.factor_decel
        );
      }

      this.turn = Math.floor(this.speed);
      this.angle += this.turn;

      // Plays the dial sound
      if (this.turn != 0) {
        if (this.sound_time == 0) {
          this.playSound();
          this.sound_time = Math.round(
            8 * (
              1.5 - (Math.abs(this.turn) / this.speed_max)
            )
          );
        } else {
          this.sound_time -= 1;
        }
      } else {
        this.sound_time = 0;
      }
    }
  }
}
