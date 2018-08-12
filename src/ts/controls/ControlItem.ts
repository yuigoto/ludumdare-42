namespace Controls {
  /**
   * LD42 : Controls/ControlItem
   * --------------------------------------------------------------------
   * Represents an instance of a single manageable controller entity.
   *
   * The controller consists of a D-pad, select and start buttons and 8
   * action buttons/keys.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class ControlItem {
    /**
     * D-pad up control state.
     */
    up: ControlState;

    /**
     * D-pad down control state.
     */
    down: ControlState;

    /**
     * D-pad left control state.
     */
    left: ControlState;

    /**
     * D-pad right control state.
     */
    right: ControlState;

    /**
     * Start button control state.
     */
    start: ControlState;

    /**
     * Select button control state.
     */
    select: ControlState;

    /**
     * Action 1 button control state.
     */
    action1: ControlState;

    /**
     * Action 2 button control state.
     */
    action2: ControlState;

    /**
     * Action 3 button control state.
     */
    action3: ControlState;

    /**
     * Action 4 button control state.
     */
    action4: ControlState;

    /**
     * Action 5 button control state.
     */
    action5: ControlState;

    /**
     * Action 6 button control state.
     */
    action6: ControlState;

    /**
     * Action 7 button control state.
     */
    action7: ControlState;

    /**
     * Action 8 button control state.
     */
    action8: ControlState;

    /**
     * Constructor.
     *
     * @param {number} up
     *    D-pad up input button/key ID
     * @param {number} down
     *    D-pad down input button/key ID
     * @param {number} left
     *    D-pad left input button/key ID
     * @param {number} right
     *    D-pad right input button/key ID
     * @param {number} start
     *    Start button/key ID
     * @param {number} select
     *    Select button/key ID
     * @param {number} action1
     *    Action 1 button/key ID
     * @param {number} action2
     *    Action 2 button/key ID
     * @param {number} action3
     *    Action 3 button/key ID
     * @param {number} action4
     *    Action 4 button/key ID
     * @param {number} action5
     *    Action 5 button/key ID
     * @param {number} action6
     *    Action 6 button/key ID
     * @param {number} action7
     *    Action 7 button/key ID
     * @param {number} action8
     *    Action 8 button/key ID
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
      this.up       = ControlStateItem(up       || Phaser.Keyboard.UP);
      this.down     = ControlStateItem(down     || Phaser.Keyboard.DOWN);
      this.left     = ControlStateItem(left     || Phaser.Keyboard.LEFT);
      this.right    = ControlStateItem(right    || Phaser.Keyboard.RIGHT);
      this.start    = ControlStateItem(start    || Phaser.Keyboard.ENTER);
      this.select   = ControlStateItem(select   || Phaser.Keyboard.ESC);
      this.action1  = ControlStateItem(action1  || Phaser.Keyboard.Z);
      this.action2  = ControlStateItem(action2  || Phaser.Keyboard.X);
      this.action3  = ControlStateItem(action3  || Phaser.Keyboard.C);
      this.action4  = ControlStateItem(action4  || Phaser.Keyboard.V);
      this.action5  = ControlStateItem(action5  || Phaser.Keyboard.A);
      this.action6  = ControlStateItem(action6  || Phaser.Keyboard.S);
      this.action7  = ControlStateItem(action7  || Phaser.Keyboard.D);
      this.action8  = ControlStateItem(action8  || Phaser.Keyboard.F);
    }
  }
}
