namespace Controls {
  /**
   * LD42 : Controls/ControlStateItem
   * --------------------------------------------------------------------
   * Returns a plain JavaScript object, implementing a default `ControlState`
   * for a single input control (a button, trigger or key).
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   *
   * @param {number} key
   *    A keyboard key, input or button numeric ID
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
      key: key
    }
  }
}
