namespace LD42 {
  /**
   * UNLOCKR : LD42/Objects/Door
   * --------------------------------------------------------------------
   * A door sprite.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Door extends Phaser.Sprite {
    // Properties
    // ------------------------------------------------------------------

    /**
     * If this door's ready to be discarded.
     */
    discard: boolean = false;

    /**
     * Group alias.
     */
    group: Phaser.Group;

    /**
     * By default, the door is a left-side, this one ensures it's a right.
     */
    rightSide: boolean = false;

    // Constructor
    // ------------------------------------------------------------------

    /**
     * Constructor.
     *
     * @param {Phaser.Game} game
     * @param {number} x
     * @param {number} y
     * @param {boolean} right
     * @param {Phaser.Group} group
     */
    constructor(
      game: Phaser.Game,
      x: number,
      y: number,
      right: boolean = false,
      group: Phaser.Group = null
    ) {
      super(game, x, y, (right === true) ? "spr_door_r" : "spr_door_l", 0);
      this.anchor.set((right === true) ? 0 : 1, 0.5);
      this.rightSide = right;

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
     * Kills this door.
     */
    killDoor() {
      if (this.alive) {
        this.alive = false;

        // Set move direction
        let move = (this.rightSide)
            ? this.x + this.width
            : this.x - this.width;
        this.game.add.tween(this).to(
          {
            x: move
          },
          1000,
          Phaser.Easing.Exponential.Out,
          true,
          200,
          0,
          false
        );

        this.game.add.tween(this).to(
          {
            alpha: 0
          },
          500,
          Phaser.Easing.Linear.None,
          true,
          300,
          0,
          false
        ).onComplete.add(function() {
          this.discard = true;
          this.group.remove(this);
          this.destroy();
        }, this);

        this.game.add.tween(this.scale).to(
          {
            x: 2,
            y: 2
          },
          1000,
          Phaser.Easing.Exponential.Out,
          true,
          300,
          0,
          false
        );
      }
    }
  }
}
