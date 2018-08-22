namespace LD42 {
  // Imports
  import ItemGroup = Interfaces.ItemGroup;
  import approach = Helpers.approach;

  /**
   * UNLOCKR : LD42/Objects/Dial
   * --------------------------------------------------------------------
   * A lock dial object.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Dial extends Phaser.Sprite {
    // Properties
    // ------------------------------------------------------------------

    /**
     * If the dial's ready to be discarded.
     */
    public discard: boolean = false;

    /**
     * Group alias.
     */
    group: Phaser.Group;

    /**
     * Current spinning direction:
     * -1: left
     * 1: right
     */
    public direction: number = 0;

    /**
     * Current spinning speed.
     */
    public speed: number = 0;

    /**
     * Maximum turning speed.
     */
    public speed_max: number = 8;

    /**
     * Acceleration factor.
     */
    public accel: number = 0.25;

    /**
     * Deceleration factor.
     */
    public decel: number = 0.5;

    /**
     * How much the dial is turning right now.
     */
    public turn: number = 0;

    /**
     * Collection used to handle sounds.
     */
    private sounds: ItemGroup = {};

    /**
     * Delau to play the next sound.
     */
    private sound_time: number = 0;

    // Construtor
    // ------------------------------------------------------------------

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
      super(game, x, y, "spr_dial", 0);

      // Center anchor
      this.anchor.setTo(0.5, 0.5);

      // Is alive
      this.alive = true;

      // Loads dial sounds
      this.sounds = {};
      this.loadSounds();

      // Add object to game
      game.add.existing(this);

      // Add to group, if exists
      if (group) group.add(this);

      // Set group alias
      this.group = group;
    }

    // Methods
    // ------------------------------------------------------------------

    /**
     * Kills itself.
     *
     * @param {Function} callback
     */
    killDial() {
      if (this.alive) {
        this.alive = false;

        // Random sign to move
        let sign_x = (Math.random() < .5) ? -1 : 1,
            sign_a = (Math.random() < .5) ? -1 : 1;

        // Fall tween
        this.game.add.tween(this).to(
          {
            y: this.y + 96
          },
          500,
          Phaser.Easing.Back.In,
          true,
          0,
          0
        );

        // X and rotation tween
        this.game.add.tween(this).to(
          {
            x: this.x + Math.round(Math.random() * 32) * sign_x,
            angle: this.angle + (40 * sign_a)
          },
          500,
          Phaser.Easing.Linear.None,
          true,
          0,
          0
        ).onComplete.add(function() {
          this.discard = true;
          this.group.remove(this);
          this.destroy();
        }, this);

        // Alpha tween
        this.game.add.tween(this).to(
          {
            alpha: 0
          },
          200,
          Phaser.Easing.Linear.None,
          true,
          200,
          0
        );

        // Scale tween
        this.game.add.tween(this.scale).to(
          {
            x: 1.5,
            y: 1.5
          },
          500,
          Phaser.Easing.Linear.None,
          true,
          0,
          0,
          false
        );
      }
    }

    /**
     * Loads the dial's sounds from the cache.
     */
    loadSounds() {
      for (let i = 1; i <= 12; i++) {
        let n = i.toString();
        if (n.length < 2) n = "0" + n;

        // Load the current sound
        this.sounds[`dial_${n}`] = this.game.add.sound(
          `snd_dial_${n}`,
          0.3,
          false
        );
      }
    }

    /**
     * Plays one of the dial's sounds randomly.
     */
    playSounds() {
      let n = (1 + Math.floor(Math.random() * 11)).toString();
      if (n.length < 2) n = "0" + n;
      this.sounds[`dial_${n}`].play();
    }

    /**
     * Plays a dial sound accordingly.
     */
    playDialSound() {
      if (this.turn != 0) {
        if (this.sound_time == 0) {
          // Plays one of the sounds
          this.playSounds();

          // Set the next delay
          this.sound_time = Math.round(
            this.speed_max * (1.5 - (Math.abs(this.turn) / this.speed_max))
          );
        } else {
          // Decrease delay
          this.sound_time -= 1;
        }
      } else {
        this.sound_time = 0;
      }
    }

    /**
     * Handles the dial's turn.
     */
    turnDial() {
      if (this.alive && Math.abs(this.direction)) {
        // Checks if direction and speed are different
        if (Math.sign(this.speed) !== Math.sign(this.direction)) {
          this.speed = approach(
            this.speed,
            0,
            this.decel
          );
        }

        this.speed = approach(
          this.speed,
          this.speed_max * this.direction,
          this.accel
        );
      } else {
        this.speed = approach(
          this.speed,
          0,
          this.decel
        );
      }

      // If alive
      if (this.alive) {
        // Define turning value
        this.turn = Math.floor(this.speed);

        // Set angle
        this.angle += this.turn;

        // Play the dial sound
        this.playDialSound();
      }
    }

    // Lifecycle Methods
    // ------------------------------------------------------------------

    /**
     * Updates the state.
     */
    update() {
      this.turnDial();
    }
  }
}
