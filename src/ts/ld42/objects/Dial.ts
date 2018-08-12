namespace LD42 {
  import approach = Helpers.approach;
  import ItemGroup = Interfaces.ItemGroup;

  export class Dial extends Phaser.Sprite {
    public direction: number = 0;

    public turn: number = 0;

    public speed: number = 0;
    public speed_max: number = 8;

    public factor_accel: number = 0.1;
    public factor_decel: number = 0.5;

    public sound_time: number = 0;

    public sound_group: ItemGroup;

    /**
     * Constructor.
     *
     * @param {Phaser.Game} game
     * @param {number} x
     * @param {number} y
     */
    constructor(game: Phaser.Game, x: number, y: number) {
      super(game, x, y, "spr_lock", 0);

      this.sound_group = {};
      this.loadSounds();

      // Set anchor at center
      this.anchor.setTo(0.5, 0.5);

      // Add object to game
      game.add.existing(this);
    }

    // Methods
    // ------------------------------------------------------------------

    loadSounds() {
      this.sound_group.dial_01 = this.game.add.sound(
        "snd_dial_01",
        .5,
        false
      );
      this.sound_group.dial_02 = this.game.add.sound(
        "snd_dial_02",
        .5,
        false
      );
      this.sound_group.dial_03 = this.game.add.sound(
        "snd_dial_03",
        .5,
        false
      );
      this.sound_group.dial_04 = this.game.add.sound(
        "snd_dial_04",
        .5,
        false
      );
      this.sound_group.dial_05 = this.game.add.sound(
        "snd_dial_05",
        .5,
        false
      );
      this.sound_group.dial_06 = this.game.add.sound(
        "snd_dial_06",
        .5,
        false
      );
    }

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
          switch (Math.floor(Math.random() * 6)) {
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
            default:
              this.sound_group.dial_01.play();
              break;
          }
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

    // Lifecycle methods
    // ------------------------------------------------------------------

    /**
     * Updates state on every frame.
     */
    update() {
      this.handleTurn();
    }
  }
}
