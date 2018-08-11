namespace Controls {
  /**
   * LD42 : Controls/ControlItem
   * --------------------------------------------------------------------
   * Instance of a single, manageable, controller entity.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class ControlItem {
    /**
     * D-pad up.
     */
    up: ControlState;

    /**
     * D-pad down.
     */
    down: ControlState;

    /**
     * D-pad left.
     */
    left: ControlState;

    /**
     * D-pad right.
     */
    right: ControlState;

    /**
     * Start button.
     */
    start: ControlState;

    /**
     * Select button.
     */
    select: ControlState;

    /**
     * Action 1.
     */
    action1: ControlState;

    /**
     * Action 2.
     */
    action2: ControlState;

    /**
     * Action 3.
     */
    action3: ControlState;

    /**
     * Action 4.
     */
    action4: ControlState;

    /**
     * Action 5.
     */
    action5: ControlState;

    /**
     * Action 6.
     */
    action6: ControlState;

    /**
     * Action 7.
     */
    action7: ControlState;

    /**
     * Action 8.
     */
    action8: ControlState;

    /**
     * Initializes.
     *
     * @param {Number} up
     * @param {Number} down
     * @param {Number} left
     * @param {Number} right
     * @param {Number} start
     * @param {Number} select
     * @param {Number} action1
     * @param {Number} action2
     * @param {Number} action3
     * @param {Number} action4
     * @param {Number} action5
     * @param {Number} action6
     * @param {Number} action7
     * @param {Number} action8
     */
    constructor(
      up: number = null,
      down: number = null,
      left: number = null,
      right: number = null,
      start: number = null,
      select: number = null,
      action1: number = null,
      action2: number = null,
      action3: number = null,
      action4: number = null,
      action5: number = null,
      action6: number = null,
      action7: number = null,
      action8: number = null
    ) {
      this.up       = ControlStateItem(up || Phaser.Keyboard.UP);
      this.down     = ControlStateItem(down || Phaser.Keyboard.DOWN);
      this.left     = ControlStateItem(left || Phaser.Keyboard.LEFT);
      this.right    = ControlStateItem(right || Phaser.Keyboard.RIGHT);
      this.start    = ControlStateItem(start || Phaser.Keyboard.ENTER);
      this.select   = ControlStateItem(select || Phaser.Keyboard.ESC);
      this.action1  = ControlStateItem(action1 || Phaser.Keyboard.Z);
      this.action2  = ControlStateItem(action2 || Phaser.Keyboard.X);
      this.action3  = ControlStateItem(action3 || Phaser.Keyboard.C);
      this.action4  = ControlStateItem(action4 || Phaser.Keyboard.V);
      this.action5  = ControlStateItem(action5 || Phaser.Keyboard.A);
      this.action6  = ControlStateItem(action6 || Phaser.Keyboard.S);
      this.action7  = ControlStateItem(action7 || Phaser.Keyboard.D);
      this.action8  = ControlStateItem(action8 || Phaser.Keyboard.F);
    }
  }
}
