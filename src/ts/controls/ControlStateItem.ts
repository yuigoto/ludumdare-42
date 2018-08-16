namespace Controls {
  /**
   * UNLOCKR : Controls/ControlStateItem
   * --------------------------------------------------------------------
   * Returns a plain JavaScript object, implementing a default `ControlState`
   * for a single input control (button, trigger or key).
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   *
   * @param {number} key
   *    Keyboard key, input button or other input ID
   * @constructor
   */
  export function ControlStateItem(
    key: number = Phaser.Keyboard.SPACEBAR
  ): ControlState {
    return {
      hold: 0,
      pressed: false,
      release: false,
      previous: 0,
      key: key,
      value: 0
    }
  }
}
