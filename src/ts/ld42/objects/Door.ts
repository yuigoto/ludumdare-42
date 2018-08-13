namespace LD42 {
  /**
   * LD42 : LD42/Objects/Door
   * --------------------------------------------------------------------
   * A door object.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Door extends Phaser.Sprite {
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
      if (right) {
        super(game, x, y, "spr_door_r", 0);
        this.anchor.set(0, 0.5);
      } else {
        super(game, x, y, "spr_door_l", 0);
        this.anchor.set(1, 0.5);
      }

      // Add object to game
      game.add.existing(this);
    }
  }
}
